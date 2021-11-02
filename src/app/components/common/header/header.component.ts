import { Component, OnInit } from '@angular/core';
import {TranslationService} from "../../../services/translation/translation.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public languageData = [
    {
      name: 'English',
      slug: 'en',
      id: 'lang1',
      iso: 'EN',
      icon: 'assets/images/flags/us.svg'
    },
    {
      name: 'Spanish',
      slug: 'es',
      id: 'lang1',
      iso: 'ES',
      icon: 'assets/images/flags/es.svg'
    },
    {
      name: 'German',
      slug: 'de',
      id: 'lang3',
      iso: 'DE',
      icon: 'assets/images/flags/de.svg'
    },
    {
      name: 'French',
      slug: 'fr',
      id: 'lang4',
      iso: 'FR',
      icon: 'assets/images/flags/fr.svg'
    }
  ];
  public activeLang = 0;
  public isMenuShow = false;
  public isMobileMenuShow = false;

  constructor(
    private translate: TranslationService
  ) { }

  ngOnInit(): void {
  }

  public toggleDropDownMenu() {
    this.isMenuShow = this.isMenuShow ? false : true;
  }

  public setLanguage(idx: number) {
    this.activeLang = idx;
    this.toggleDropDownMenu();
    this.translate.init(this.languageData[idx].slug);
    sessionStorage.setItem("language", idx.toString());
  }

  public mobileMenuToggle() {
    this.isMobileMenuShow = this.isMobileMenuShow ? false : true;
  }

}
