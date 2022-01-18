import React, { useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment, getData } from '../../stores/data'
// import { connect } from "react-redux";
import { useGetOrdersQuery } from '../../stores/data';
import { Card } from "@blueprintjs/core";
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import numeral from "numeral";



class Example extends React.PureComponent {
    render() {
        return <Card className="example-card">{this.props.children}</Card>;
    }
}
class Test extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
    };
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    render() {
        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                ...this.getColumnSearchProps('id'),
                sorter: (a, b) => a.id - b.id,
                sortDirections: ['descend', 'ascend'],
                ellipsis: true,
                align: 'right',
            },
            {
                title: 'Color',
                dataIndex: 'color',
                key: 'color',
                ...this.getColumnSearchProps('color'),
                sorter: (a, b) => a.color.length - b.color.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name'),
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Pantone',
                dataIndex: 'pantone_value',
                key: 'pantone_value',
                ...this.getColumnSearchProps('pantone_value'),
                sorter: (a, b) => a.pantone_value.length - b.pantone_value.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                ...this.getColumnSearchProps('age'),
                sorter: (a, b) => a.age - b.age,
                ellipsis: true,
                sortDirections: ['descend', 'ascend'],
                align: 'right',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                ...this.getColumnSearchProps('address'),
                sorter: (a, b) => a.address.length - b.address.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                ...this.getColumnSearchProps('price'),
                sorter: (a, b) => a.price - b.price,
                ellipsis: true,
                sortDirections: ['descend', 'ascend'],
                align: 'right',
                render: p => '$' + numeral(p).format("0,0")
            },
        ];
        let tempArr = this.props.data?.data;
        let temp = []
        if (tempArr?.length > 0) {
            for (const [index, iterator] of tempArr.entries()) {
                temp.push({ ...iterator, age: `3${index}`, price: `3005${index}`, address: `luis sum ${index} ${iterator.name}` })
            }
        }

        return (
            <div>
                <Example>
                    <Table columns={columns} dataSource={temp} pagination={false} />
                </Example>

            </div>
        )
    }
}
export function Demo() {
    // const [getData, setGetData] = useState([]);
    const { data } = useGetOrdersQuery();
    return (
        <Test data={data} />
    )
}