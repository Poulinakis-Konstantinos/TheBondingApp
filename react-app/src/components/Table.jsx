import DataTable from 'react-data-table-component';


const Table = (props) => {

    return (
        <DataTable
            columns={props.columns}
            data={props.data}
        />
    );
};

export default Table;