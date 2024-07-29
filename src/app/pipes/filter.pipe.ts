import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(users: any[] | null, searchText: string): any[] {
    if (!users) {
      return [];
    }
    if (!searchText) {
      return users; 
    }
    searchText = searchText.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(searchText)
    );
  }
}
