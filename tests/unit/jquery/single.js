'use strict';

var TestUtil = require('../../test-util');

TestUtil.createJQueryTest(
    'jquery/single: test clear',
    ['input-types/single', 'templates'],
    function(test, $input) {
        $input.selectivity({
            data: { id: 1, text: 'Amsterdam' },
            items: [
                { id: 1, text: 'Amsterdam' },
                { id: 2, text: 'Antwerp' },
                { id: 3, text: 'Athens' }
            ]
        });

        $input.selectivity('clear');

        test.deepEqual($input.selectivity('data'), null);

        test.deepEqual($input.selectivity('value'), null);
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test don\'t open after clear',
    ['input-types/single', 'dropdown', 'templates'],
    function(test, $input, $) {
        $input.selectivity({
            allowClear: true,
            data: { id: 1, text: 'Amsterdam' },
            items: [
                { id: 1, text: 'Amsterdam' },
                { id: 2, text: 'Antwerp' },
                { id: 3, text: 'Athens' }
            ]
        });

        test.equal($input.selectivity('value'), 1);

        $input.find('.selectivity-single-selected-item-remove').click();

        test.equal($input.selectivity('data'), null);
        test.equal($input.selectivity('value'), null);

        test.equal($('.selectivity-dropdown').length, 0);
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test initial data',
    ['input-types/single', 'templates'],
    function(test, $input) {
        $input.selectivity({
            data: { id: 1, text: 'Amsterdam' },
            items: [
                { id: 1, text: 'Amsterdam' },
                { id: 2, text: 'Antwerp' },
                { id: 3, text: 'Athens' }
            ]
        });

        test.deepEqual($input.selectivity('data'), { id: 1, text: 'Amsterdam' });

        test.deepEqual($input.selectivity('value'), 1);
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test initial value',
    ['input-types/single', 'templates'],
    function(test, $input) {
        $input.selectivity({
            items: ['Amsterdam', 'Antwerp', 'Athens'],
            value: 'Amsterdam'
        });

        test.deepEqual($input.selectivity('data'), { id: 'Amsterdam', text: 'Amsterdam' });

        test.deepEqual($input.selectivity('value'), 'Amsterdam');
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test nested data',
    ['input-types/single', 'templates'],
    function(test, $input) {
        $input.selectivity({
            data: { id: 2, text: 'Antwerp' },
            items: [{
                text: 'Austria',
                children: [
                    { id: 54, text: 'Vienna' }
                ]
            }, {
                text: 'Belgium',
                children: [
                    { id: 2, text: 'Antwerp' },
                    { id: 9, text: 'Brussels' }
                ]
            }, {
                text: 'Bulgaria',
                children: [
                    { id: 48, text: 'Sofia' }
                ]
            }]
        });

        test.deepEqual($input.selectivity('data'), { id: 2, text: 'Antwerp' });

        test.deepEqual($input.selectivity('value'), 2);
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test nested value',
    ['input-types/single', 'templates'],
    function(test, $input) {
        $input.selectivity({
            value: 2,
            items: [{
                text: 'Austria',
                children: [
                    { id: 54, text: 'Vienna' }
                ]
            }, {
                text: 'Belgium',
                children: [
                    { id: 2, text: 'Antwerp' },
                    { id: 9, text: 'Brussels' }
                ]
            }, {
                text: 'Bulgaria',
                children: [
                    { id: 48, text: 'Sofia' }
                ]
            }]
        });

        test.deepEqual($input.selectivity('data'), { id: 2, text: 'Antwerp' });

        test.deepEqual($input.selectivity('value'), 2);
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test without data',
    ['input-types/single', 'templates'],
    function(test, $input) {
        $input.selectivity({
            items: [
                { id: 1, text: 'Amsterdam' },
                { id: 2, text: 'Antwerp' },
                { id: 3, text: 'Athens' }
            ]
        });

        test.deepEqual($input.selectivity('data'), null);

        test.deepEqual($input.selectivity('value'), null);
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test without search input',
    ['input-types/single', 'dropdown', 'templates'],
    function(test, $input, $) {
        $input.selectivity({
            items: [
                { id: 1, text: 'Amsterdam' },
                { id: 2, text: 'Antwerp' },
                { id: 3, text: 'Athens' }
            ],
            showSearchInputInDropdown: false
        });

        test.equal($input.selectivity('val'), null);

        $input.selectivity('open');

        var $dropdown = $('.selectivity-dropdown');
        test.equal($dropdown.length, 1);
        test.equal($dropdown.find('.selectivity-result-item').length, 3);
        test.equal($dropdown.find('.selectivity-result-item').eq(0).text(), 'Amsterdam');

        $dropdown.find('.selectivity-result-item').eq(0).click();

        test.equal($input.selectivity('val'), 1);
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test set value',
    ['input-types/single', 'templates'],
    function(test, $input) {
        $input.selectivity({
            items: [ 'Amsterdam', 'Antwerp', 'Athens' ],
            value: 'Amsterdam'
        });

        test.deepEqual($input.selectivity('value'), 'Amsterdam');

        $input.selectivity('value', 'Antwerp');

        test.deepEqual($input.selectivity('data'), { id: 'Antwerp', text: 'Antwerp' });

        test.deepEqual($input.selectivity('value'), 'Antwerp');
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test set value with init selection',
    ['input-types/single', 'templates'],
    function(test, $input) {
        $input.selectivity({
            initSelection: function(value, callback) {
                var cities = {
                    1: 'Amsterdam',
                    2: 'Antwerp',
                    3: 'Athens'
                };
                callback({ id: value, text: cities[value] });
            },
            value: 1
        });

        test.deepEqual($input.selectivity('data'), { id: 1, text: 'Amsterdam' });

        test.deepEqual($input.selectivity('value'), 1);

        $input.selectivity('value', 2);

        test.deepEqual($input.selectivity('data'), { id: 2, text: 'Antwerp' });

        test.deepEqual($input.selectivity('value'), 2);
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test set value without items',
    ['input-types/single', 'templates'],
    function(test, $input) {
        $input.selectivity({
            value: 'Amsterdam'
        });

        test.deepEqual($input.selectivity('value'), 'Amsterdam');

        $input.selectivity('value', 'Antwerp');

        test.deepEqual($input.selectivity('data'), { id: 'Antwerp', text: 'Antwerp' });

        test.deepEqual($input.selectivity('value'), 'Antwerp');
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test mouse over',
    ['input-types/single', 'templates'],
    function(test, $input, $) {
        $input.selectivity({
            value: 'Amsterdam'
        });

        $('.selectivity-single-select').trigger('mouseover');

        test.ok($input.hasClass('hover'));

        $input.trigger('mouseleave');

        test.equal($input.hasClass('hover'), false);
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test click and mouse over',
    ['input-types/single', 'dropdown', 'templates'],
    function(test, $input, $) {
        $input.selectivity({
            value: 'Amsterdam'
        });

        $('.selectivity-single-select').click();

        test.equal($input.attr('class'), 'open');

        $('.selectivity-single-select').trigger('mouseover');

        test.equal($input.attr('class'),'open hover');

        $input.selectivity('close');

        test.equal($input.attr('class'), 'hover');
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test blur event after opening single select',
    ['input-types/single', 'dropdown', 'templates'],
    function(test, $input, $) {
        $input.selectivity({
            value: 'Amsterdam',
            showSearchInputInDropdown: false
        });

        $('.selectivity-single-select').click();

        test.ok($input.hasClass('open'));

        $input.trigger('blur');

        test.equal($('#selectivity-input').hasClass('open'), false);
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test don\'t close when hovering while blur event occurs',
    ['input-types/single', 'dropdown', 'templates'],
    function(test, $input, $) {
        $input.selectivity({
            value: 'Amsterdam',
            showSearchInputInDropdown: false
        });

        $('.selectivity-single-select').click();

        $('.selectivity-single-select').trigger('mouseover');

        $input.trigger('blur');

        test.equal($input.hasClass('open'), true);
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test default tab index',
    ['input-types/single', 'dropdown', 'templates'],
    function(test, $input) {
        $input.selectivity({
            value: 'Amsterdam',
            showSearchInputInDropdown: false
        });

        test.equal($input.attr('tabindex'), '0');
    }
);

TestUtil.createJQueryTest(
    'jquery/single: test tab index option',
    ['input-types/single', 'dropdown', 'templates'],
    function(test, $input) {
        $input.selectivity({
            value: 'Amsterdam',
            showSearchInputInDropdown: false,
            tabIndex: 2
        });

        test.equal($input.attr('tabindex'), '2');
    }
);