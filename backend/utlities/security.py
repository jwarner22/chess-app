from fastapi import Depends, HTTPException
from starlette.status import HTTP_401_UNAUTHORIZED
from fastapi.security import OAuth2PasswordBearer
import firebase_admin
from firebase_admin import credentials, auth
import time

cert = {
  "type": "service_account",
  "project_id": "signup-and-login-auth",
  "private_key_id": "1f2a3bb653962c58c18694743910e9aca90fb4ee",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCkM/RSa6xPqflI\nRdgdZeaJpjCaxHKDOGuVYDutcJlYnU9SBgqpkKEi0kut5ZfjnrTuZffoTKyKrPas\nVxtPpO6qAo8Tb7UPsOgiVYWtzls4t2p3bENKZt5FZ7nVqtmSWq+XyXBCu45WMynM\n8NMmfO1irZzpxf6YB02xBT9sFBzaWlrPkR9WZXUXcOf4iQ3emPXisHOu2YuU5AfS\nJs3ZNMCdzRNrEelxvUC8NtaKXn5983XVLeNXfbVEOjXhL74nKhjKQ1xvP20OcbF2\nZxCBBTR6+AZ9BqTq+N4hLm4q/cAxk+L2lOW0109eVUG2iPY35vOYpNsCVRCeqr/o\nsBxDM69tAgMBAAECggEAArUl8Y37o2dRcv2j2KhA1Zg7SPIK/rBEJeHBBNUh0jJA\nh+u4P/Tgk1XAZbeuz364dmM8DpqPuyGrAksqv3TKyAbkG7/weQ0ZEX0zh8V//5QW\nr1gbq/MSSzawpnNQxHcLr4cPe3+Nk0z4rXvIdOQDzhLAJE1dgLLuIbMic+0eT1i9\n9+0rT16Xhz+2P/ytQrPvyxMV8wxQwCOKM0dubBjK1fp7u0UCZBteYztGrX3nX2ik\nOoLGkbWBxVpmpm4ve1CnBsx+f3WDaKQY+2tN1k0DOkvCC6ujZlBs8pTBF0aSdx6O\nNVa3wMbK2KkzKk1f1a3UyGTYcEXmP/YJt3zrAEHxQQKBgQDYBVRniiFUDJml5/O2\nhUlE3I2FXWJr7YEPBeERAhM3uDzPmXO8GuaPAUjDO2wPdiQA6W+y+6dEi3Fz/9IO\ng+QYwnoEKYB0bIKcaw3DdVQh1Ey3HSOY7ucuHmfjItBftTuXFHTaA3aLzX5D64xk\nRU78ry6PvzlMrH8teFtriOHzOQKBgQDCl5bCaMuTa1s++kEHRNAgcF8EPQesu7C/\n6HiAyCfyXhC6ew5ixSD1+HF+Cw74v3nyMzQ4dMWqUcZjPi/oc7SgTHDBnvjiAy0U\nNhROFjq9N+L6OrDjaJtCVC2/THtL3s6+P2YQjOzvSH+Kd1C2fsES+DzE6r9BDq/V\nWrPN+1HZ1QKBgQDQtb2J1+xBf3cH0yYlx3s12/2jx8jqy+pwcFa2jxGwOQIP9Yvb\nRwZRToVVk1jhS1yXwPJZtEg0sqEn2RfDTGyZ+3PWB58DXT+IDuqaWQazNKH2HWIi\nRVf4uAnZau52OezcGDiZ1tS3WBBRYQggbNJW0o6i9bdPvC2X6fwx1muwCQKBgDMe\n4dNG9pxO6tS7p9PCBy9OdhfF9LszP7ba2rVyX9QzVA+5fkkCYqtbzmz/eLpuixnO\ny9w9CSS6gPTXhHx70Sr/ievD2Lx/extBLcpp2pqVEQMN4iSL+aXOOYp1DDsdWJDw\nVN7qNuCR2jfFKqYW3KAgKM7OoNn1gsn5Hx1w9crVAoGBANSYheGrvCkPiYegKDgd\nI4B7UUnmYbEPEljqbUAelPrCSoUNnLvKpm9ulAf7l++RYjQVPojXA/a89TabYDG8\nh08IBqFORGGiU3R0cOZljZmMgZBTD8TRUFp6soLZe5m9LXpRaP/qOAtUifpmG8BL\n3zFw+HsS3cJ/9ws6js7GvxvR\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-jffbc@signup-and-login-auth.iam.gserviceaccount.com",
  "client_id": "117478759141656251665",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jffbc%40signup-and-login-auth.iam.gserviceaccount.com"
}


cred = credentials.Certificate(cert)
# Initialize the default app
firebase_admin.initialize_app(cred)


oauth_schema = OAuth2PasswordBearer(tokenUrl='/token')
# validate firebase token
def check_token(token: str): #= Depends(oauth_schema)):
    try:
        # check firebase here
        decoded_token = auth.verify_id_token(token) # verifies token from firebase
        # payload:
            # exp: expiration time
            # iat: issued at time
            # aud: audience
            # iss: issuer
            # sub: subject (uid)
            # auth_time: authentication time
        exp = float(decoded_token['exp']) # expiration time

        if time.time() < exp:
            return True

        if decoded_token is None:
            return False

    except Exception as e:
        # return exception here
        return  False
    return  False