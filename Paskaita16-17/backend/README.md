## Čia yra readme failas skirtas tiesiog sudėti kažkokiai svarbiai info apie projektą. pvz kaip pasileisti ką galima su juo daryti ir pan.

## Jei norit pamatyti šito failo surenderintą versiją paspauskit command+shift+p arba ctrl+shift+p ir suraskit pasirinkimą "Markdown: Open preview"

## kodas kuri naudojau suukurti naują cars lentelę

## Nepamirškit susikurti savo .env failą

```
CREATE TABLE public.cars (
	id serial NOT NULL,
	title text NULL,
	image text NULL,
	price decimal NULL,
	numberplates varchar(6) NULL,
	CONSTRAINT cars_pk PRIMARY KEY (id)
);
```
