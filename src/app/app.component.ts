import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'google-translator-app';
  fromText: string = '';
  toText: string = '';
  translateFrom: string = 'en-GB';
  translateTo: string = 'hi-IN';

  countries: { [key: string]: string } = {
    'am-ET': 'Amharic',
    'ar-SA': 'Arabic',
    'be-BY': 'Bielarus',
    'bem-ZM': 'Bemba',
    'bi-VU': 'Bislama',
    'bjs-BB': 'Bajan',
    'bn-IN': 'Bengali',
    'bo-CN': 'Tibetan',
    'br-FR': 'Breton',
    'bs-BA': 'Bosnian',
    'ca-ES': 'Catalan',
    'cop-EG': 'Coptic',
    'cs-CZ': 'Czech',
    'cy-GB': 'Welsh',
    'da-DK': 'Danish',
    'dz-BT': 'Dzongkha',
    'de-DE': 'German',
    'dv-MV': 'Maldivian',
    'el-GR': 'Greek',
    'en-GB': 'English',
    'es-ES': 'Spanish',
    'et-EE': 'Estonian',
    'eu-ES': 'Basque',
    'fa-IR': 'Persian',
    'fi-FI': 'Finnish',
    'fn-FNG': 'Fanagalo',
    'fo-FO': 'Faroese',
    'fr-FR': 'French',
    'gl-ES': 'Galician',
    'gu-IN': 'Gujarati',
    'ha-NE': 'Hausa',
    'he-IL': 'Hebrew',
    'hi-IN': 'Hindi',
    'hr-HR': 'Croatian',
    'hu-HU': 'Hungarian',
    'id-ID': 'Indonesian',
    'is-IS': 'Icelandic',
    'it-IT': 'Italian',
    'ja-JP': 'Japanese',
    'kk-KZ': 'Kazakh',
    'km-KM': 'Khmer',
    'kn-IN': 'Kannada',
    'ko-KR': 'Korean',
    'ku-TR': 'Kurdish',
    'ky-KG': 'Kyrgyz',
    'la-VA': 'Latin',
    'lo-LA': 'Lao',
    'lv-LV': 'Latvian',
    'men-SL': 'Mende',
    'mg-MG': 'Malagasy',
    'mi-NZ': 'Maori',
    'ms-MY': 'Malay',
    'mt-MT': 'Maltese',
    'my-MM': 'Burmese',
    'ne-NP': 'Nepali',
    'niu-NU': 'Niuean',
    'nl-NL': 'Dutch',
    'no-NO': 'Norwegian',
    'ny-MW': 'Nyanja',
    'ur-PK': 'Pakistani',
    'pau-PW': 'Palauan',
    'pa-IN': 'Panjabi',
    'ps-PK': 'Pashto',
    'pis-SB': 'Pijin',
    'pl-PL': 'Polish',
    'pt-PT': 'Portuguese',
    'rn-BI': 'Kirundi',
    'ro-RO': 'Romanian',
    'ru-RU': 'Russian',
    'sg-CF': 'Sango',
    'si-LK': 'Sinhala',
    'sk-SK': 'Slovak',
    'sm-WS': 'Samoan',
    'sn-ZW': 'Shona',
    'so-SO': 'Somali',
    'sq-AL': 'Albanian',
    'sr-RS': 'Serbian',
    'sv-SE': 'Swedish',
    'sw-SZ': 'Swahili',
    'ta-LK': 'Tamil',
    'te-IN': 'Telugu',
    'tet-TL': 'Tetum',
    'tg-TJ': 'Tajik',
    'th-TH': 'Thai',
    'ti-TI': 'Tigrinya',
    'tk-TM': 'Turkmen',
    'tl-PH': 'Tagalog',
    'tn-BW': 'Tswana',
    'to-TO': 'Tongan',
    'tr-TR': 'Turkish',
    'uk-UA': 'Ukrainian',
    'uz-UZ': 'Uzbek',
    'vi-VN': 'Vietnamese',
    'wo-SN': 'Wolof',
    'xh-ZA': 'Xhosa',
    'yi-YD': 'Yiddish',
    'zu-ZA': 'Zulu',
  };

  countriesList: { value: string; label: string }[] = [];

  constructor(private http: HttpClient) {
    this.populateCountriesList();
  }

  populateCountriesList(): void {
    for (const [key, value] of Object.entries(this.countries)) {
      this.countriesList.push({ value: key, label: value });
    }
  }

  exchangeLanguages(): void {
    [this.fromText, this.toText] = [this.toText, this.fromText];
    [this.translateFrom, this.translateTo] = [
      this.translateTo,
      this.translateFrom,
    ];
  }

  translateText(): void {
    if (!this.fromText) return;
    this.toText = '';
    const apiUrl = `https://api.mymemory.translated.net/get?q=${this.fromText}&langpair=${this.translateFrom}|${this.translateTo}`;
    this.http.get(apiUrl).subscribe((data: any) => {
      this.toText = data.responseData.translatedText;
      data.matches.forEach((match: any) => {
        if (match.id === 0) {
          this.toText = match.translation;
        }
      });
    });
  }

  copyText(direction: string): void {
    const textToCopy = direction === 'from' ? this.fromText : this.toText;
    navigator.clipboard.writeText(textToCopy);
  }

  speak(direction: string): void {
    const textToSpeak = direction === 'from' ? this.fromText : this.toText;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang =
      direction === 'from' ? this.translateFrom : this.translateTo;
    speechSynthesis.speak(utterance);
  }
}
