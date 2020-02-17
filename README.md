# Prueba de código - Devo PS
## Metodología utilizada
### Ejercicio 1 
Se ha utilizado la versión 3.6 de Python.
Al ser un ejercicio sencillo he ido programando el script de Python y ejecutándolo hasta conseguir el resultado esperado.
### Ejercicio 2
Principalmente he ido programando un fichero js y probando cada una de sus sentencias copiándolas y pegándolas en la consola de las herramientas para desarrolladores (F12) del navegador (Google Chrome). Los ficheros html y css se han ido modificando con los elementos necesarios para poder seguir avanzando y probando las funcione javascript.

## Problemas encontrados
### Ejercicio 2
Tras dedicarle mucho tiempo a conseguir pasarle al gráfico lineal generado mediante la librería 'canvasJS', después de probar "mockeando" datos y verificar que funcionaba correctamente, al pasarle todos los datos obtenidos de los 3 JSON descubrí que el navegador se "colgaba". Después de dedicarle bastante tiempo a intentar averiguar el por qué y de revisar el código en busca de posibles bucles infinitos o demasiado grandes he llegado a la conclusión de que quizás el problema sea que dicha librería no soporta una carga de datos de ese tamaño (aunque no sea excesivamente grande en este caso).

Tras este gran contratiempo, como no me quedaba mucho tiempo para terminar el ejercicio decidí comentar la línea de código que renderiza este segundo gráfico y explicar en este README el problema encontrado.

Además, al comenzar a integrar el fichero javascript con el fichero html me he dado cuenta que al incluir la librería jQuery en el fichero html da un conflicto con un método de la librería 'canvasJS'. Hasta entonces no había tenido problema porque probaba el código desde la consola del navegador. Una vez más, por falta de tiempo he decidido comentar las lineas de código afectadas y comentar en este README el problema encontrado.

Finalmente, para simplificar la entrega he decidido incluir el código javascript directamente en el fichero html.


A pesar de que la funcionalidad del ejercicio no es completa, agradecería que se revisara la lógica implementada para tratar y homogeneizar los datos recibidos de los diferentes archivos JSON.
