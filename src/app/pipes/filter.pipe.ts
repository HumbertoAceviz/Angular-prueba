import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  //Utilizamos un metodo que toma dos parametros, una lista de usuarios que puede ser null, y un texto
  //que el usuario ingresa para buscar
  transform(users: any[] | null, searchText: string): any[] {
    //si la lista de usuarios es nula, regresara un arreglo vacio
    if (!users) {
      return [];
    }
    //Si no hay texto ingresado para buscar, regresaremos la lista completa
    if (!searchText) {
      return users;
    }
    //Primero que nada convertimos en texto en minisculas para no tener problemas con mayusculas y minisculas
    searchText = searchText.toLowerCase();

    //Busca si el nombre de usuarios, incluyen el texto de busqueda, y si lo hay , lo agrega al array, para
    //mostrar el array filtrado cuando se use el pipe
    return users.filter(user =>
      user.name.toLowerCase().includes(searchText)
    );
  }
}
