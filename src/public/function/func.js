const CosmosClient = require('@azure/cosmos').CosmosClient;

var mapStyle = {
    version: 8,
    name: 'Dark',
    sources: {
        mapbox: {
            type: 'vector',
            url: 'mapbox://mapbox.mapbox-streets-v8',
        },
        overlay: {
            type: 'image',
            url: '/css/img/map.png',
            coordinates: [
                [107.341313, 10.478016], //10.478016, 107.341313
                [107.36419, 10.4915], //10.491500, 107.364190
                [107.367628, 10.485564], //10.485564, 107.367628
                [107.34476, 10.472198], //10.472198, 107.344760
            ],
        },
    },
    sprite: 'mapbox://sprites/mapbox/streets-v8',
    glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
    layers: [
        {
            id: 'background',
            type: 'background',
            paint: { 'background-color': 'violet' },
        },
        {
            id: 'boundaries',
            source: 'mapbox',
            'source-layer': 'admin',
            type: 'line',
            paint: {
                'line-color': '#797979',
                'line-dasharray': [2, 2, 6, 2],
            },
            filter: ['all', ['==', 'maritime', 0]],
        },
        {
            id: 'overlay',
            source: 'overlay',
            type: 'raster',
            paint: { 'raster-opacity': 0.85 },
        },
    ],
};

const general_data = [
    {
        module: 'A1',
        data: {
            tsl: '10000 kg',
            ta: '30000 kg',
            fcr: '1.30',
            dtdk: '2315 trieu vnd',
            tcp: '13150 trieu vnd',
        },
    },
    {
        module: 'A2',
        data: {
            tsl: '200000 kg',
            ta: '40000 kg',
            fcr: '1.31',
            dtdk: '2415 trieu vnd',
            tcp: '14150 trieu vnd',
        },
    },
    {
        module: 'A3',
        data: {
            tsl: '300000 kg',
            ta: '50000 kg',
            fcr: '1.32',
            dtdk: '2515 trieu vnd',
            tcp: '15150 trieu vnd',
        },
    },
];

var geojson = {
    type: 'FeatureCollection',
    features: [
        {
            id: '1',
            properties: {
                title: 'A1',
                color: '#1eff00',
            },
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [107.34578136542956, 10.479727131557539],
                        [107.34674553880052, 10.47980222878607],
                        [107.34665862578231, 10.477261824415834],
                        [107.34562782849105, 10.477172893210835],
                        [107.34578136542956, 10.479727131557539],
                    ],
                ],
            },
        },
        {
            id: '2',
            properties: {
                title: 'A2',
                color: '#1eff00',
            },
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [107.34684345856402, 10.479800703716691],
                        [107.34777597844146, 10.479858795659467],
                        [107.34768825240599, 10.477361708327166],
                        [107.34676020329624, 10.477275444951388],
                        [107.34684345856402, 10.479800703716691],
                    ],
                ],
            },
        },
        {
            id: '3',
            properties: {
                title: 'A3',
                color: '#ff0000',
            },
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [107.34790004895677, 10.479882056492045],
                        [107.34880560506718, 10.479940518177514],
                        [107.34874558198857, 10.477447971679894],
                        [107.34780368140036, 10.477357168149965],
                        [107.34790004895677, 10.479882056492045],
                    ],
                ],
            },
        },
    ],
};

function checkPointinsidePolygon(turf, point, polygon) {
    var p = turf.point(point);
    var poly = turf.polygon(polygon);
    if (turf.inside(p, poly) == true) {
        return true;
    }
}
