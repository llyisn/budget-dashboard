//beige: #e3ddcf
//olive: #51471b
//quial (blue): #7d8689
//dark brown: #28100c
//cranberry: #591e21
//black red: #200303

export const widgetColorSchemas = {
    transaction: [
        {
            key: 'main',
            label: 'main bg',
            default: '#e3ddcf',
            global: true
        },

        {
            key: 'text',
            label: 'text',
            default: '#200303',
            global: true,

            children: [
                { key: 'text-title', label: 'title'},
                { key: 'text-label', label: 'labels'},
                { key: 'text-amount-pos', label: 'money income'},
                { key: 'text-amount-neg', label: 'money expense'},
                { key: 'text-amount-neutr', label: 'money transfer'},
                { key: 'text-date', label: 'date'},
            ]
        },

        {
            key: 'border',
            label: 'border',
            default: '#200303',
            global: true,

            children: [
                {
                    key: 'transaction-border',
                    label: 'transaction border',
                }
            ]
        },

        {
            key: 'transaction-row-bg',
            label: 'transaction bg',
            default: '#ffffff'
        }

    ],

    'transactions list': [
        {
            key: 'main',
            label: 'main bg',
            default: '#e3ddcf',
            global: true
        },

        {
            key: 'text',
            label: 'text',
            default: '#200303',
            global: true,

            children: [
                { key: 'text-title', label: 'title'},
                { key: 'text-label', label: 'labels'},
                { key: 'text-amount-pos', label: 'money income'},
                { key: 'text-amount-neg', label: 'money expense'},
                { key: 'text-amount-neutr', label: 'money transfer'},
                { key: 'text-date', label: 'date'},
            ]
        },

        {
            key: 'border',
            label: 'border',
            default: '#200303',
            global: true,

            children: [
                {
                    key: 'transaction-border',
                    label: 'transaction border',
                }
            ]
        },

        {
            key: 'transaction-row-bg',
            label: 'transaction bg',
            default: '#ffffff'
        },

        {
            key: 'search',
            label: 'search',
            default: '#B2A6A6'
        },

        {
            key: 'filters',
            label: 'filters',
            default: '#D5CFAE'
        },

        {
            key: 'buttons',
            label: 'buttons',
            default: '#fff',
            global: true
        }

    ],

    text: [
        {
            key: 'main',
            label: 'main bg',
            default: '#e3ddcf',
            global: true
        },

        {
            key: 'text',
            label: 'text',
            default: '',
            global: true,
        },

        {
            key: 'border',
            label: 'border',
            default: '#200303',
            global: true,
        },
    ],

    image: [
        {
            key: 'border',
            label: 'border',
            default: '#200303',
            global: true,
        },
    ],

    checklist: [
        {
            key: 'main',
            label: 'main bg',
            default: '#e3ddcf',
            global: true
        },

        {
            key: 'text',
            label: 'text',
            default: '#200303',
            global: true,
        },

        {
            key: 'border',
            label: 'border',
            default: '#200303',
            global: true,
        },
    ],

    goal: [
        {
            key: 'main',
            label: 'main bg',
            default: '#e3ddcf',
            global: true
        },

        {
            key: 'text',
            label: 'text',
            default: '#200303',
            global: true,

            children: [
                {
                    key: 'text-labels',
                    label: 'labels',
                },
                {
                    key: 'text-add-info',
                    label: 'add. info',
                },
                {
                    key: 'text-amount',
                    label: 'money amount',
                },
                {
                    key: 'text-title',
                    label: 'title',
                    global: true
                }
            ]
        },

        {
            key: 'border',
            label: 'border',
            default: '#200303',
            global: true,
        },
    ],

    stat: [
        {
            key: 'main',
            label: 'main bg',
            default: '#e3ddcf',
            global: true
        },

        {
            key: 'text',
            label: 'text',
            default: '#200303',
            global: true,

            children: [
                {
                    key: 'text-label',
                    label: 'title',
                },
                {
                    key: 'text-add-info',
                    label: 'add. info',
                },
                {
                    key: 'text-amount',
                    label: 'money amount',
                },
            ]
        },

        {
            key: 'border',
            label: 'border',
            default: '#200303',
            global: true,
        },
    ],

    budget: [
        {
            key: 'main',
            label: 'main bg',
            default: '#e3ddcf',
            global: true
        },

        {
            key: 'text',
            label: 'text',
            default: '#200303',
            global: true,

            children: [
                {
                    key: 'text-label',
                    label: 'title'
                },
                {
                    key: 'text-add-info',
                    label: 'add. info'
                },
                {
                    key: 'text-amount',
                    label: 'money amount'
                }
            ]
        },

        {
            key: 'border',
            label: 'border',
            default: '#200303',
            global: true,
        },

        {
            key: 'bar',
            label: 'bar',
            default: '#fff',
            global: true,
        },
    ],

     'top expenses': [
        {
            key: 'main',
            label: 'main bg',
            default: '#e3ddcf',
            global: true
        },

        {
            key: 'text',
            label: 'text',
            default: '#200303',
            global: true,

            children: [
                {
                    key: 'text-title',
                    label: 'title'
                },
                {
                    key: 'text-labels',
                    label: 'labels'
                },
                {
                    key: 'text-amount',
                    label: 'money amount'
                }
            ]
        },

        {
            key: 'border',
            label: 'border',
            default: '#200303',
            global: true,
        },

        {
            key: 'buttons',
            label: 'button',
            default: '#fff',
            global: true
        }
    ],


}