export class LocalStorage {
  private static keys = {
    DIGILOCKER_REDIRECTION: "digilocker_redirection",
  };

  public static set setDigilocker(redirectedFrom: string) {
    localStorage.setItem(
      LocalStorage.keys.DIGILOCKER_REDIRECTION,
      redirectedFrom
    );
  }

  public static get getDigilocker(): string | null {
    const redirectedFrom = localStorage.getItem(
      LocalStorage.keys.DIGILOCKER_REDIRECTION
    );
    return redirectedFrom;
  }

  public static removeDigilocker(): void {
    localStorage.removeItem(LocalStorage.keys.DIGILOCKER_REDIRECTION);
  }
}
