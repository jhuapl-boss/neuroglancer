from . import credentials_provider
from .futures import run_on_new_thread
import logging
import threading

class BossCredentialsProvider(credentials_provider.CredentialsProvider):
    def __init__(self):
        super(BossCredentialsProvider, self).__init__()

        # Make sure logging is initialized.  Does nothing if logging has already
        # been initialized.
        logging.basicConfig()

        self._lock = threading.Lock()
        self._credentials = None

    def set_token(self, token):
        self._credentials = dict(tokenType=u'Token', accessToken=token)

    def get_new(self):
        def func():
            with self._lock:
                # First, see if user has defined a token using set_token
                if self._credentials is not None:
                    return self._credentials

                # If not, look for config file in intern file location

                # Else, use "public"
                return dict(tokenType=u'Token', accessToken='public')

        return run_on_new_thread(func)
