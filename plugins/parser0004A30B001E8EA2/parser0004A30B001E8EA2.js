/**
 * @file
 *
 * Sensor 0004A30B001E8EA2
 */
'use strict';

const Parser = require('binary-parser').Parser;

module.exports = function setup(options, imports, register) {
    const parser = new Parser()
        .endianess('big')
        .uint8('header_frame_counter')
        .uint8('header_frame_length')
        .uint8('battery_sensor_id')
        .uint8('battery_value')
        .uint8('charging_power_sensor_id')
        .uint16le('charging_power_value')
        .uint8('air_temperature_sensor_id')
        .floatle('air_temperature_value')
        .uint8('humidity_sensor_id')
        .floatle('humidity_value')
        .uint8('pressure_sensor_id')
        .floatle('pressure_value')
        .uint8('lux_sensor_id')
        .uint32le('lux_value')
        .uint8('solar_radiation_sensor_id')
        .floatle('solar_radiation_value')
        .uint8('wind_speed_sensor_id')
        .floatle('wind_speed_value')
        .uint8('wind_vane_sensor_id')
        .uint8('wind_vane_value')
        .uint8('rain_sensor_id')
        .floatle('rain_value');

    let eventBus = imports.eventbus;

    eventBus.on('parse.0004A30B001E8EA2', function (data, returnEvent) {
        let buf = new Buffer(data, 'hex');

        let result = parser.parse(buf);

        let values = [];

        for (let key in result) {
            if (result.hasOwnProperty(key)) {
                if (key.indexOf('_sensor_id') > -1) {
                    let split = key.split('_sensor_id');
                    let id = result[key];

                    let value = result[split[0] + '_value'];

                    values.push({
                        sensor_id: id,
                        type: split[0],
                        value: value
                    });
                }
            }
        }

        result.values = values;

        eventBus.emit(returnEvent, result);
    });

    /**
     * Register with architect.
     */
    register(null, {});
};