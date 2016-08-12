// intro

// [step 0]
// define the task
var car_data = {
  vehicle: [
    { id: 1, title: 'subaru forester' },
    { id: 2, title: 'toyota camry' },
    { id: 3, title: 'mazda miata' },
    { id: 4, title: 'bmw x3' },
  ],
  colors: [
    { id: 1, color: 'red' },
    { id: 2, color: 'green' },
    { id: 3, color: 'blue' },
    { id: 4, color: 'white' },
    { id: 5, color: 'black' },
  ],
  vehicle_to_color: [
    { vehicle: 1, color: 1 },
    { vehicle: 1, color: 2 },
    { vehicle: 1, color: 4 },
    { vehicle: 2, color: 1 },
    { vehicle: 2, color: 4 },
    { vehicle: 2, color: 5 },
    { vehicle: 3, color: 1 },
    { vehicle: 3, color: 2 },
    { vehicle: 3, color: 3 },
    { vehicle: 4, color: 4 },
    { vehicle: 3, color: 5 },
  ],
};

function find_car(car_title) {
  var i;

  for (i = 0; i < car_data.vehicle.length; i++)
    if (car_data.vehicle[i].title == car_title)
      break;

  // [step 1]
  //return car_data.vehicle[i];

  var vehicle = car_data.vehicle[i];
  if (!vehicle)
    return undefined;

  var available_color_ids = [];
  for (i = 0; i < car_data.vehicle_to_color.length; i++)
    if (car_data.vehicle_to_color[i].vehicle == vehicle.id)
      available_color_ids.push(car_data.vehicle_to_color[i].color);

  // [step 2]
  // return available_color_ids;

  var colors = [];
  var j;

  for (i = 0; i < available_color_ids.length; i++)
    for (j = 0; j < car_data.colors.length; j++)
      if (available_color_ids[i] == car_data.colors[j].id)
        colors.push(car_data.colors[j].color);

  // [step 3]
  return colors;
};

// [step 4]
//show how filter and map work

_.map(car_data.vehicle, v => v.title);
_.map(car_data.vehicle, 'title');

_.filter(car_data.vehicle, v => v.title == 'subaru forester');
_.filter(car_data.vehicle, { title: 'subaru forester' });

_.find(car_data.vehicle, { title: 'subaru forester' });

// [step 5]
// use filter and map to resolve our task

function find_car2(car_title) {
  var vehicle = _.find(car_data.vehicle, { title: car_title });

  // [step 6]
  //return vehicle;

  //var available_color_ids = _.filter(car_data.vehicle_to_color, { vehicle: vehicle.id })
  //var available_color_ids = _.filter(car_data.vehicle_to_color, { vehicle: _.get(vehicle, 'id') })
  var available_color_ids = _.map(_.filter(car_data.vehicle_to_color, { vehicle: _.get(vehicle, 'id') }), 'color');

  // [step 7]
  //return available_color_ids;

  //var colors = _.map(available_color_ids, id => _.find(car_data.colors, { id: id }))
  var colors = _.map(_.map(available_color_ids, id => _.find(car_data.colors, { id: id })), 'color');

  // [step 8]
  return colors;
};

// [step 9]
// show what is _.chain

//_.filter(car_data.vehicle_to_color, {vehicle: 2})
_.map(_.filter(car_data.vehicle_to_color, { vehicle: 2 }), 'color');
_.chain(car_data.vehicle_to_color).filter({ vehicle: 2 }).map('color').value();

// [step 10]
// use chain to simplify our code
function find_car3(car_title) {
  var vehicle_id = _.chain(car_data.vehicle).find({ title: car_title }).get('id').value();

  // [step 11]
  //return vehicle_id;

  // [step 12]
  //var colors = _.chain(car_data.vehicle_to_color).filter({ vehicle: vehicle_id }).map('color').value();
  //return colors;

  function get_color_by_id(color_id) {
    return _.chain(car_data.colors).find({ id: color_id }).get('color').value();
  }

  // [step 13]
  var colors = _.chain(car_data.vehicle_to_color).filter({ vehicle: vehicle_id }).map('color').map(get_color_by_id).value();
  return colors;

}

// [step 14]
// get colors for car title list

function find_colors(car_titles) {
  //return _.chain(car_titles).map(find_car3).value()
  //return _.chain(car_titles).map(find_car3).flatten().value();
  return _.chain(car_titles).map(find_car3).flatten().uniq().value();
}
