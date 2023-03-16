import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Terminology, TERMINOLOGIES } from './terminology';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class TerminologyService {
 
  terms: Terminology[] = [];
  constructor(private http: HttpClient) { 
    this.makeRequest();
  }
  // private data store to save current Terminologies
  private terminologyData = TERMINOLOGIES;
  // private Observer to push changes with .next()
  private terminologyObs = new Subject<Terminology[]>();

  // external observer for components to subscribe
  currentTerminology = this.terminologyObs.asObservable();

  public async addEntry(term: Terminology) {
    const response = await fetch('/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(term)
    });
    return response.json();
  }


  getTerminologies() {
    return this.terms;
  }

  public async getTerminologyById(id: string | null) {
    const response = await fetch(`/terminologies/${id}`, {
      method: 'GET'
    });
    return response.json();
  }

  // READ
  public async makeRequest() {
    this.terms = await fetch('/terminologies')
    .then((response) => response.json());
  }

  // CREATE
  public async postData(data: {
    title: string,
    desc: string,
    chapter: string,
    creator: string
  }) {
    const response = await fetch ('/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  // DELETE
  public async deleteItem(id: string) {
    const response = await fetch(`/item/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }

  // UPDATE
  public async updateData(id: string, data: Terminology) {
    const response = await fetch(`/update/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json()
  }



  // EVENT HANLDER
  async additem(title: string, desc: string, chapter: string, creator: string)  {
    this.postData({
      title: title,
      desc: desc,
      chapter: chapter,
      creator: creator
    })
      .then(response => {
        this.makeRequest();
      })
  }


}
