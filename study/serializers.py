import os
from rest_framework import serializers
from .models import Subject, Topic, Question, Review, PastPaper


class SubjectSerializer(serializers.ModelSerializer):
    topic_count = serializers.SerializerMethodField()
    price_zmw = serializers.SerializerMethodField()

    def get_topic_count(self, obj):
        return obj.topics.filter(is_published=True).count()

    def get_price_zmw(self, obj):
        free_access = os.getenv("ACADEMY_FREE_ACCESS", "true").lower() == "true"
        return "0.00" if free_access else str(obj.price_zmw)

    class Meta:
        model = Subject
        fields = [
            "id",
            "name",
            "category",
            "curriculum",
            "description",
            "price_zmw",
            "topic_count",
        ]


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ["id", "subject", "title", "summary", "notes_url", "video_url", "order"]


class QuestionSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ["id", "topic", "prompt", "options", "correct_option", "explanation"]

    def get_options(self, obj):
        return {
            "A": obj.option_a,
            "B": obj.option_b,
            "C": obj.option_c,
            "D": obj.option_d,
        }


class ReviewSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(read_only=True)
    subject_name = serializers.CharField(source="subject.name", read_only=True, default=None)

    class Meta:
        model = Review
        fields = [
            "id", "student_name", "subject", "subject_name", "review_type",
            "rating", "comment", "created_at"
        ]
        read_only_fields = ["id", "student_name", "subject_name", "created_at"]

    def validate(self, attrs):
        review_type = attrs.get("review_type", "experience")
        subject = attrs.get("subject")
        if review_type == "subject" and subject is None:
            raise serializers.ValidationError({"subject": "Choose a subject to rate."})
        if review_type == "experience" and subject is not None:
            raise serializers.ValidationError({"subject": "Overall experience reviews should not select a subject."})
        return attrs

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be from 1 to 5.")
        return value


class PastPaperSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source="subject.name", read_only=True)
    # resource_url is the preferred API field. file_url remains as a compatibility alias
    # for older frontend builds and existing uploaded papers.
    resource_url = serializers.SerializerMethodField()
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = PastPaper
        fields = [
            "id", "title", "subject", "subject_name", "year", "exam_type",
            "resource_url", "file_url",
        ]

    def get_resource_url(self, obj):
        if obj.external_url:
            return obj.external_url
        if not obj.file:
            return None
        request = self.context.get("request")
        url = obj.file.url
        return request.build_absolute_uri(url) if request else url

    def get_file_url(self, obj):
        return self.get_resource_url(obj)
