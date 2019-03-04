from django.shortcuts import render
from django.http import HttpResponse

from docks.api.serializers import ShowCurrentUserSerializer

from rest_framework.views import APIView

from rest_framework.response import Response

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


class ShowProfile(APIView):
	authentication_classes = (TokenAuthentication, SessionAuthentication)
	permission_classes = (IsAuthenticated,)

	def get(self, request):
		serializer = ShowCurrentUserSerializer(request.user)
		return Response(serializer.data)
