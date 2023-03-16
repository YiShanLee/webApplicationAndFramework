import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { chapter, Terminology } from './terminology';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const terminologies: Terminology[] = [

      

    ];
    return { terminologies }
  }

 
}


