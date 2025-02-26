import logging
import socket
import time

from django.http.response import JsonResponse

logger = logging.getLogger(__name__)

class RequestLogMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.time()
        extra = self.process_request(request)

        response = self.get_response(request)

        end_time = time.time()

        extra['elapsed_time'] = end_time - start_time
        extra['response_code'] = response.status_code
        extra['user'] = request.user.pk

        logger.info("API Request", extra=extra)
        return response

    def process_request(self, request):
        log_data = {
            'remote_address': request.META['REMOTE_ADDR'],
            'host': request.get_host(),
            'hostname': socket.gethostname(),
            'request_method': request.method,
            'request_path': request.get_full_path(),
            'scheme': request.scheme,
            'content_type': request.content_type,
            'content_length': request.META['CONTENT_LENGTH'],
            'http_referer': request.META.get('HTTP_REFERER'),
            'user_agent': request.META['HTTP_USER_AGENT'],
            'remote_host': request.META['REMOTE_HOST'],
        }


        return log_data
