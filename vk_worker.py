import vk_api
import time
import unicodedata

class VkWorker:

    def get_status(self):
        response = self.vk_session.get_api().status.get()
        status = unicodedata.normalize('NFKD', response['text']).encode('ascii', 'ignore')
        return status

    def __init__(self, login, password):
        self.vk_session = vk_api.VkApi(login, password)
        
        try:
            self.vk_session.auth()
        except vk_api.AuthError as error:
            print error