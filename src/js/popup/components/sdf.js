<MaterialTable
    columns={[
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
    ]}
    data={[
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    ]}
    title="Actions with Column Index"
    actions={[
        {
            icon: 'account_circle',
            tooltip: 'Show User Info',
            onClick: (event, rowData) => {
                alert('You clicked user ' + rowData.name)
            },
        },
        rowData => ({
            icon: 'account_circle',
            tooltip: 'Show User Info',
            disabled: rowData.birthYear >= 2000,
            onClick: (event, rowData) => {
                alert('You clicked user ' + rowData.name)
            },
        }),
        {
            icon: 'account_circle',
            tooltip: 'Show User Info',
            onClick: (event, rowData) => {
                alert('You clicked user ' + rowData.name)
            },
            iconProps: {
                style: {
                    fontSize: 30,
                    color: 'green',
                },
            },
        },
    ]}
    options={{
        actionsColumnIndex: -1,
    }}
/>