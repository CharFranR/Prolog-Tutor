padre(juan,pedro).
padre(pedro,luis).
padre(carlos,juan).

madre(ana,pedro).
madre(maria,juan).

abuelo(X,Y) :- padre(X,Z), padre(Z,Y).
abuela(X,Y) :- madre(X,Z), padre(Z,Y).