import { Component, OnInit } from '@angular/core';
import { Terminology } from '../shared/terminology';
import { TerminologyService } from '../shared/terminology.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  terminologies: Terminology[] = [];

  constructor(private terminologyService: TerminologyService) {
 
  }

  ngOnInit(): void {
    

    /**
     * Makes a requrest to the server that fetches all terminologies.
     */
    this.terminologyService.makeRequest()
      .then(() => {
        this.terminologies = this.terminologyService.getTerminologies();
      }).then(() => this.sortTerminologies());

  }

  
  /**
   * Sorts the terminologies that were fetched from the server 
   * by chapter, and, if the chapter is the same, by title.
   */
    sortTerminologies() {
      this.terminologies.sort((termA, termB) => {
        const chapterNumberA = this.mapChapterToNumber(termA.chapter);
        const chapterNumberB = this.mapChapterToNumber(termB.chapter);
        return (
          chapterNumberA.localeCompare(chapterNumberB) ||
          termA.title.localeCompare(termB.title)
        );
      });
    }


 /**
  * Invokes a request in the terminology service that causes
  * the server to delete the given terminology.
  * 
  * @param terminolgy - The terminology to be delted
  */
  delete(terminolgy: Terminology): void {
    this.terminologyService.deleteItem(terminolgy._id)
    this.makeRequest().then(() => this.sortTerminologies());
  }
  

  /**
   * Fetches all terminologies from the server.
   */
  public async makeRequest() {
    this.terminologies = await fetch('/terminologies')
    .then((response) => response.json());
  }

  /**
   * Maps each chapter specified in the enum in terminology.ts
   * to a number in order to be able to sort terminologies by chapter.
   * The numbers correspond to the position of the chapter within the WebT module.
   * 
   * @param chapter - The available chapters 
   * @returns - The number that corresponds to the chapter 
   */
  mapChapterToNumber(chapter: string): any {
    switch (chapter) {
      case 'Das Web':
        return '0';
      case 'HTML':
        return '1';
      case 'CSS':
        return '2';
      case 'JavaScript, DOM, AJAX':
        return '3';
      case 'Bibliotheken / Frameworks':
        return '4';
      case 'SPA-Frameworks: Architektur, Angular':
        return '5';
      case 'Server-Side Scripting: PHP, ...':
        return '6';
      case 'Server-Side Frameworks':
        return '7';
      case 'CMS, LMS, ...':
        return '8';
      case 'SEO, Sicherheit, Geschichte ...':
        return '9';
    }
  }

  /**
   * Assigns a color value to each chapter.
   * @param chapter The chapter string for the terminolgy item.
   * @returns A string with a hex code representing the color for the chapter.
   */
  calculateStyle(chapter: string): any {
    switch (chapter) {
      case 'Das Web':
        return '#C7CEEA';
      case 'HTML':
        return '#FFDAC1';
      case 'CSS':
        return '#E0BBE4';
      case 'JavaScript, DOM, AJAX':
        return '#f3d67f';
      case 'Bibliotheken / Frameworks':
        return '#e7d8a9';
      case 'SPA-Frameworks: Architektur, Angular':
        return '#aee5fa';
      case 'Server-Side Scripting: PHP, ...':
        return '#ecccad';
      case 'Server-Side Frameworks':
        return '#e8e3bf';
      case 'CMS, LMS, ...':
        return '#e8999b';
      case 'SEO, Sicherheit, Geschichte ...':
        return '#bcfbae';
    }
  }



}
