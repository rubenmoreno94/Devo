number = int(input("Introduzca un numero:"))
sum = 0

for i in range(1, number):
  if number % i == 0 :
      sum += i

if sum == number:
    print("El número",number,"es perfecto.")
elif sum > number:
    print("El número",number,"es abundante.")
else:
    print("El número",number,"es defectivo.")
