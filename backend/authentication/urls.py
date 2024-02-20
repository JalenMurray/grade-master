from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, CustomUserDetailView

app_name = 'authentication'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('user/', CustomUserDetailView.as_view(), name='user-detail')
]