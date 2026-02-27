class NoIndexPrivatePathsMiddleware:
    """
    Prevent search engines from indexing admin/API/private endpoints.
    """

    NO_INDEX_PREFIXES = ('/api/', '/admin/', '/dashboard/', '/private/')

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.path.startswith(self.NO_INDEX_PREFIXES):
            response['X-Robots-Tag'] = 'noindex, nofollow, noarchive'
        return response
