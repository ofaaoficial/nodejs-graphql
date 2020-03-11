# Grahpql Nodejs

La base de una API con graphql son los `esquemas` describen detalladamente todos los modelos, tipos de datos e información que tendrá el API.

* Comando para generar un nuevo proyecto
`` npx license mit > LICENSE && npx gitignore node && git init && npm init -y ``

## Query
Las `query` permiten hacer perticiones (Request) a la API para obtener información con la característica de definir que consulta quiere ejecutar y que campos de esa consulta desea obtener.

`Equivaldría al método GET en Rest APIs.`

## Mutation
Las mutaciones son un mecanimos para gestionar (Crear, Actualizar y Borrar) datos en el API. 

`Equilvaldría a los métodos POST, PUT, DELETE, PATCH en Rest APIs.`


## Alias & Fragments
```graphql
# Alias
# Sirve para renombrar consultas y ademas hacer varias a la vez.   
 query Aliases{
   allCourses: getCourses{
     ...CourseFields
   }
   
   Course1: getCourse(id: "5e67a92d1fd93b2db878c8f5"){
     ...CourseFields
     people {
       _id
       document
     }
   }
 }
 

# Fragments
# Resume el codigo requerido por la query cuando se consultan campos iguales. 
 fragment CourseFields on Course {
 	_id
   title
   description
 }
``` 

## Query variables

```graphql
mutation AddPersonToCourse ($course: ID!, $student: ID!) {
  addPersonToCourse(courseID: $course studentID: $student) {
    _id
    title
    people{
      document
      name
    }
  }
}

# Query Variables
{
  "course": "5e67a92d1fd93b2db878c8f5",
  "student": "5e67a1b66f3b030e40343aec"
}
```


## Variables of type input

```graphql
mutation createCourse ($createInput: CourseCreateInput!) {
  createCourse(input: $createInput) {
    _id
    title
    title
    description
    topic
   	level
  }
}

# query variables
{
  "createInput": {
    "title": "Titulo de prueba",
    "teacher": "Oscar Amado",
    "description": "Descripcion del curso",
    "topic": "Progra",
    "level": "advanced"
  }
}
```


## Interfaces
Nos permiten agrupar diferentes tipos y usarlos para relacionarlos con otros tipos.

```graphql
fragment personAttributes on Person {
  _id
  document
  name
  email
}

query allData{
  Courses: getCourses{
    _id
    title
    level
  }
  
  People: getPeople{
    ...personAttributes
    ... on Monitor {
      phone
    }    
  }
  
  FirstPerson: getPerson(id: "5e67a1b66f3b030e40343aec") {
    ...personAttributes
  }
  
	getMonitor: getPerson(id: "5e67f17f751ac21914866d9b") {
  	...personAttributes
    ... on Monitor {
      phone
    }
  }
    
}

mutation createMonitor($monitorInput: PersonCreateInput!){
  createPerson(input: $monitorInput){
    ...personAttributes    
  }
}

# Query variables
{
  "monitorInput": {
    "document": "122f345",
    "name": "Oscar",
    "email": "monitor@curso.xd",
    "phone": "xd"
  }
}

```


# Directivas
Son instrucciones que permiten agregar validaciones a las queries.
```graphql
query getPeopleData($monitor: Boolean!, $avatar: Boolean!) {
  getPeople{
    _id
    name
    ... on Monitor @include(if: $monitor) {
      phone
    }
    ... on Student @include(if: $avatar) {
      avatar
    }
  }
}
# Query variables
{
  "monitor": true,
  "avatar": true
}
```

## Union 
```graphql

query AllData {
  getCourses {
    title
  }
  getPeople {
    name
  }
}

query Search {
  searchItems(keyword: "oscar") {
    __typename    
    ... on Course {
      title
      teacher
      description
    }
    ... on Monitor {
      document
      name
      phone
    }
    ... on Student {
      document
      email
      avatar
    }
  }
```
