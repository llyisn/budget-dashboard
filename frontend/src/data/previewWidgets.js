//{type: str, settings: {}, w: int, h: int}
export const previewWidgets = {
    income: [
        {
    type: 'stat',
    settings: {
      variant: 'compact',
      label: 'income',
      colors: {},
      preview: true
    },
    w: 2,
    h: 1
  },
        {
    type: 'stat',
    settings: {
      variant: 'inline',
      label: 'income',
      colors: {},
      preview: {
        amount: '1234.56',
        delta: '+2.4%',
      }
    },
    w: 3,
    h: 1
  },
  {
    type: 'stat',
    settings: {
      variant: 'detailed',
      label: 'income',
      colors: {},
      preview: {
        amount: '1234.56',
        delta: '+2.4%',
      }
    },
    w: 3,
    h: 2
  }
    ],
    expense: [
        {
    type: 'stat',
    settings: {
      variant: 'compact',
      label: 'expense',
      colors: {},
      preview: true
    },
    w: 2,
    h: 1
  },
        {
    type: 'stat',
    settings: {
      variant: 'inline',
      label: 'expense',
      colors: {},
      preview: {
        amount: '1234.56',
        delta: '+2.4%',
      }
    },
    w: 3,
    h: 1
  },
  {
    type: 'stat',
    settings: {
      variant: 'detailed',
      label: 'expense',
      colors: {},
      preview: {
        amount: '1234.56',
        delta: '+2.4%',
      }
    },
    w: 3,
    h: 2
  }
    ],
    savings: [
        {
    type: 'stat',
    settings: {
      variant: 'compact',
      label: 'savings',
      colors: {},
      preview: true
    },
    w: 2,
    h: 1
  },
        {
    type: 'stat',
    settings: {
      variant: 'inline',
      label: 'savings',
      colors: {},
      preview: {
        amount: '1234.56',
        delta: '+2.4%',
      }
    },
    w: 3,
    h: 1
  },
  {
    type: 'stat',
    settings: {
      variant: 'detailed',
      label: 'savings',
      colors: {},
      preview: {
        amount: '1234.56',
        delta: '+2.4%',
      }
    },
    w: 3,
    h: 2
  }
    ],
    budget: [
        {
            type: 'budget',
            settings: {
                variant: 'inline',
                colors: {},
                preview: true,
                max: 1000
            },
            w: 4,
            h: 1
        }
    ],
    transactions: [
        {
            type: 'transaction',
            settings: {
                colors: {},
                preview: true
            },
            w: 4,
            h: 6
        },
        {
            type: 'transactions list',
            settings: {
                colors: {},
                preview: true
            },
            w: 5,
            h: 8
        }
    ],
    text: [
        {
            type: 'text',
            settings: {
                colors: {},
                text: 'i close my eyes and i see this image floating beside me'
            },
            w: 3,
            h: 2
        }
    ],

    goal: [
      {
        type: 'goal',
        settings: {
          colors: {},
          preview: true
        },
        w: 3,
        h: 2
      }
    ],

    statistics: [
      {
        type: 'top expenses',
        settings: {
          colors: {},
          preview: true
        },
        w: 4,
        h: 2
      }
    ],

    image: [
      {
        type: 'image',
        settings: {
          colors: {},
        },
        w: 3,
        h: 3
      }
    ]
    
}