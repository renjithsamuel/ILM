import { NextUtil } from './nextUtil';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export class Cookie {
  private static keys = {
    ACCESS_TOKEN: 'access_token',
    SESSION: 'session',
    EMAIL: 'email',
  };

  public static get access_token(): string {
    if (NextUtil.isSSR) {
      return '';
    }
    const accessToken = getCookie(Cookie.keys.ACCESS_TOKEN) as string;
    if (!accessToken) {
      console.error('access_token not found');
    }
    return accessToken;
  }

  public static set access_token(access_token: string) {
    setCookie(access_token, Cookie.access_token);
  }

  public static get session(): string {
    if (NextUtil.isSSR) {
      return '';
    }
    const session = getCookie(Cookie.keys.SESSION) as string;
    if (!session) {
      console.error('session not found');
    }
    return session;
  }

  public static set session(session: string) {
    setCookie(session, Cookie.session);
  }

  public static get email(): string {
    if (NextUtil.isSSR) {
      return '';
    }
    const email = getCookie(Cookie.keys.EMAIL) as string;
    if (!email) {
      console.error('email not found');
    }
    return email;
  }

  public static set email(email: string) {
    setCookie(Cookie.keys.EMAIL, email);
  }


  static logout(): void {
    deleteCookie(Cookie.keys.SESSION);
    deleteCookie(Cookie.keys.ACCESS_TOKEN);
    deleteCookie(Cookie.keys.EMAIL);
  }
}
