from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import NoteSerializer
from base.models import Note

import subprocess
from dotenv import load_dotenv, dotenv_values

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username # encrypted

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/query'
    ]
    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

def index(request):
    cmd = "/home/website/backend/base/api/token_erc_20 " + request.GET.get('cmd')
    env = dotenv_values("/home/website/backend/base/api/env/.env.org1.minter")
    print(cmd.split(" "))
    res = subprocess.run(cmd.split(" "), env=env, capture_output=True)
    
    return JsonResponse({'stdout': res.stdout.decode(), 'stderr': res.stderr.decode()})