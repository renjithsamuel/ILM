export class LocalStorage {
  private static keys = {
    DATA_THEME: "DATA_THEME",
  };

  public static set setTheme(theme: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(LocalStorage.keys.DATA_THEME, theme);
    }
  }

  public static get getTheme(): string | null {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem(LocalStorage.keys.DATA_THEME);
      return theme;
    }
    return null;
  }
}
