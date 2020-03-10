Grahpql Nodejs

Base de una API con graphql es un Esquema describe detalladamente todos los tipos de datos e informacion que tendra el API.


Comando para generar un nuevo proyecto

`` npx license mit > LICENSE && npx gitignore node && git init && npm init -y ``

Las query permiten hacer request a la API para obtener informacion, tiene la caracteristica de definir que consulta se quiere ejecutar y que campos de esa consulta se desean obtener.

Las mutaciones son un mecanimos para insertar datos en el API. 

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

Query variables

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
