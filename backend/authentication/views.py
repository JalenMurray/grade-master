from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from .serializers import CustomUserSerializer
from .models import CustomUser
from .permissions import UserDetailAccessPermission
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            email_exists = CustomUser.objects.filter(email=serializer.validated_data['email']).exists()
            username_exists = CustomUser.objects.filter(user_name=serializer.validated_data['user_name'])\
                .exists()
            if email_exists:
                return Response({'detail': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

            if username_exists:
                return Response({'detail': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

            user = serializer.save()
            user.is_active = True
            user.save()

            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CustomUserDetailView(RetrieveAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

