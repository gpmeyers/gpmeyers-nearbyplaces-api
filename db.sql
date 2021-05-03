create table mynearbyplaces.places(
	id bigserial primary key,
	name text not null,
	placelocation text not null
);

create table mynearbyplaces.reviews(
	id bigserial primary key,
	placeid integer references mynearbyplaces.places(id),
	review text not null
);