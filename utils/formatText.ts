export class FormatTextUtil {
  public static formatTicketText = (text: string): string => {
    if (typeof text !== 'string') {
      return text;
    }
    text = text.replace(/_/g, ' ');
    const words = text.split(' ');

    for (let i = 0; i < words.length; i++) {
      words[i] =
        words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }

    text = words.join(' ');

    return text;
  };

  public static formatFirstWord = (text: string): string => {
    if (typeof text !== 'string' || text?.length === 0) {
      return text;
    }
    const words = text?.split(' ');
    if (words?.length > 0) {
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    }

    return words.join(' ');
  };
}
