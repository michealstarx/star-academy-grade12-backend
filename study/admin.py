from django.contrib import admin
from .models import Subject, Topic, Question, Purchase, Review, PastPaper


class TopicInline(admin.TabularInline):
    model = Topic
    fields = ("title", "summary", "notes_url", "video_url", "order", "is_published")
    extra = 0


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price_zmw", "is_published")
    list_filter = ("category", "is_published")
    search_fields = ("name",)
    inlines = [TopicInline]


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ("title", "subject", "order", "has_notes_link", "has_video_link", "is_published")
    list_filter = ("subject", "is_published")
    search_fields = ("title", "subject__name")
    fields = ("subject", "title", "summary", "notes_url", "video_url", "order", "is_published")

    @admin.display(boolean=True, description="PDF notes link")
    def has_notes_link(self, obj):
        return bool(obj.notes_url)

    @admin.display(boolean=True, description="Video link")
    def has_video_link(self, obj):
        return bool(obj.video_url)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("prompt", "topic", "correct_option", "is_published")
    list_filter = ("topic__subject", "is_published")


@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = (
        "reference",
        "subject",
        "amount",
        "operator",
        "status",
        "created_at",
    )
    list_filter = ("status", "operator")
    search_fields = ("reference", "phone", "lenco_reference")
    readonly_fields = ("provider_payload", "created_at", "updated_at")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("student_name", "review_type", "subject", "rating", "is_approved", "created_at")
    list_filter = ("review_type", "subject", "is_approved", "rating")
    actions = ["approve_reviews"]

    @admin.action(description="Approve selected reviews for public display")
    def approve_reviews(self, request, queryset):
        queryset.update(is_approved=True)


@admin.register(PastPaper)
class PastPaperAdmin(admin.ModelAdmin):
    list_display = ("title", "subject", "year", "exam_type", "has_resource_link", "is_published")
    list_filter = ("subject", "year", "exam_type", "is_published")
    search_fields = ("title", "subject__name")
    fields = ("subject", "title", "year", "exam_type", "external_url", "is_published", "created_at")
    readonly_fields = ("created_at",)

    @admin.display(boolean=True, description="Resource link")
    def has_resource_link(self, obj):
        return bool(obj.external_url or obj.file)
