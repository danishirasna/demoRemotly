
import React, { Component } from 'react'
import { Spin, Input, Button, Popover, Menu, Dropdown, Popconfirm } from "antd"
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import $ from 'jquery';
import Store from '../../stores';

const style = { cursor: "pointer" }


const data = [{ id: 0, firstname: "danish", lastname: "ali", email: "ansari@gmail.com", age: "22", class: "bs" },
{ id: 1, firstname: "salman", lastname: "ali", email: "ali@gmail.com", age: "22", class: "bs" },
{ id: 2, firstname: "akbar", lastname: "danish", email: "danish@gmail.com", age: "22", class: "bs" },
{ id: 3, firstname: "haider", lastname: "kashan", email: "kashan@gmail.com", age: "22", class: "bs" },
{ id: 4, firstname: "muneeb", lastname: "ali", email: "ali@gmail.com", age: "22", class: "bs" },
{ id: 5, firstname: "ali", lastname: "okara", email: "oakra@gmail.com", age: "22", class: "bs" },
{ id: 6, firstname: "faisal", lastname: "ali", email: "ali@gmail.com", age: "22", class: "bs" },
{ id: 7, firstname: "danish", lastname: "haider", email: "hairder@gmail.com", age: "22", class: "bs" },

]
const dataChildren = [{
    parent_id: 0, children: [{ id: 0, firstname: "danish", lastname: "ali", email: "ansari@gmail.com", age: "22", class: "bs" },
    { id: 0, firstname: "danish", lastname: "ali", email: "ansari@gmail.com", age: "22", class: "bs" }
    ]
},
{
    parent_id: 1, children: [{ id: 1, firstname: "danish children", lastname: "ali children", email: "ansari@gmail.com children", age: "22", class: "bs" },
    { id: 1, firstname: "danish", lastname: "ali", email: "ansari@gmail.com children", age: "22", class: "bs" }
    ]
},
{ parent_id: 2, children: [{ id: 2, firstname: "danish children", lastname: "ali", email: "ansari@gmail.com", age: "22", class: "bs" }] },
{ parent_id: 3, children: [{ id: 3, firstname: "danish children", lastname: "ali", email: "ansari@gmail.com children", age: "22", class: "bs" }] },
{
    parent_id: 4, children: [{ id: 4, firstname: "danish children", lastname: "ali children", email: "ansari@gmail.com", age: "22", class: "bs" },
    { id: 4, firstname: "danish", lastname: "ali", email: "ansari@gmail.com children", age: "22", class: "bs" },
    { id: 4, firstname: "danish children", lastname: "ali", email: "ansari@gmail.com children", age: "22", class: "bs" }
    ]
},
{
    parent_id: 5, children: [{ id: 5, firstname: "danish children", lastname: "ali", email: "ansari@gmail.com", age: "22", class: "bs" },
    { id: 5, firstname: "danish children", lastname: "ali", email: "ansari@gmail.com children", age: "22", class: "bs" }
    ]
},
{ parent_id: 6, children: [{ id: 6, firstname: "danish children", lastname: "ali", email: "ansari@gmail.com", age: "22", class: "bs" }] },
{
    parent_id: 7, children: [{ id: 7, firstname: "danish children", lastname: "ali children", email: "ansari@gmail.com", age: "22", class: "bs" },
    { id: 7, firstname: "danish children", lastname: "ali", email: "ansari@gmail.com children", age: "22", class: "bs" }
    ]
},
]


class Login extends Component {

    constructor(props) {
        super(props)
    }
    state = {
        email: "",
        password: "",
        loading: false,
        table_heading: [{ id: 0, name: "ID", key: "id" }, { id: 1, name: "First Name", key: "firstname" }, { id: 2, name: "Last Name", key: "lastname" }, { id: 3, name: "Email", key: "email" }, { id: 4, name: "Age", key: "age" }, { id: 5, name: "Class", key: "class" }],
        x: 0, y: 0,
        startDragPosi: -1,
        overDragPosi: -1,
        show_columns: [true, true, true, true, true, true],
        editVisibilty: false,
        addVisibilty: false,
        inputValue: "",
        data: data,
        tempdata: data,
        parenstSelct: [],
        parentSelectIndex: [],
        dataChildren: dataChildren,
        childrenShowHide: [],

    }
    componentDidMount() {
        let parenstSelct = [];
        let childrenShowHide = [];
        for (let index = 0; index < this.state.data.length; index++) {
            parenstSelct.push(false);

        }

        this.setState({ parenstSelct, childrenShowHide: parenstSelct })
    }
    onRowShowHide = (id) => {
        let childrenShowHide = this.state.childrenShowHide;
        if (childrenShowHide[id]) {
            childrenShowHide[id] = false;
        }
        else {
            childrenShowHide[id] = true;
        }
        this.setState({ childrenShowHide })
    }
    //DRAG START
    newOnDragStart = (e, currentItemId) => {
        this.setState({ startDragPosi: parseInt(e.currentTarget.dataset.position) })
        console.log((e.currentTarget.dataset.position), currentItemId);

    };
    newOnDragStartRow = (e, currentItemId) => {
        this.setState({ startDragPosiRow: parseInt(e.currentTarget.dataset.position) })
        console.log((e.currentTarget.dataset.position), currentItemId);

    };

    parentSelect = (index) => {


        let temp = this.state.parenstSelct;
        let tempIndex = this.state.parentSelectIndex;

        if (temp[index]) {
            temp[index] = false;
            tempIndex[index] = null
            this.setState({ parenstSelct: temp, parentSelectIndex: tempIndex })
            return
        }
        else {
            temp[index] = true;
            tempIndex.push(index);
        }
        this.setState({ parenstSelct: temp, parentSelectIndex: tempIndex })



    }

    sortByColumns = (columns, type) => {

        let temp = this.state.data;
        let temp2 = [];

        Object.entries(this.state.data[0]).map(([key, value]) => {
            if (columns == key) {
                if (type == "asc") {
                    temp2 = temp.sort(function (a, b) {
                        if (a[key] < b[key]) return -1;
                        if (a[key] > b[key]) return 1;
                        return 0
                    })
                }
                if (type == "dec") {
                    temp2 = temp.sort(function (a, b) {
                        if (a[key] > b[key]) return -1;
                        if (a[key] < b[key]) return 1;
                        return 0
                    })
                }

            }
        }
        )
        this.setState({ data: temp2 })

    }


    //DRAG OVER TO CATCH THE "TO INDEX"
    newOnDragOver = (e) => {
        console.log(JSON.stringify(e.currentTarget.dataset.position), "run");

        this.setState({ overDragPosi: parseInt(e.currentTarget.dataset.position) })

    };
    newOnDragOverRow = (e) => {
        console.log(JSON.stringify(e.currentTarget.dataset.position), "run");

        this.setState({ overDragPosiRow: parseInt(e.currentTarget.dataset.position) })

    };
    deleteColumns = (id) => {
        console.log(id);
        let temp = this.state.table_heading;
        let temp2 = [];
        for (let index = 0; index < this.state.table_heading.length; index++) {
            console.log(index != parseInt(id), index, parseInt(id));
            if (index != parseInt(id)) {
                temp2.push(temp[index]);
            }

        }
        this.setState({ table_heading: temp2 })

    }
    allselect = (value) => {
        let temp = [];
        let temp2 = []
        if (!value) {
            for (let index = 0; index < this.state.parenstSelct.length; index++) {
                temp[index] = false;
                temp2.push(null);

            }
        }
        else {
            for (let index = 0; index < this.state.parenstSelct.length; index++) {
                temp[index] = true;
                temp2.push(index);

            }
        }
        this.setState({ parenstSelct: temp, parentSelectIndex: temp2 })

    }

    //WHEN I DROP THE ITEM AT THE NEW POSITION
    newOnDragEnd = (e) => {
        console.log(JSON.stringify(e.currentTarget.dataset.position));

        let tempArr = this.state.table_heading

        let tempValue = tempArr[parseInt(e.currentTarget.dataset.position)];
        tempArr[parseInt(e.currentTarget.dataset.position)] = tempArr[this.state.overDragPosi];
        tempArr[this.state.overDragPosi] = tempValue;
        this.setState({ table_heading: tempArr })


    };
    newOnDragEndRow = (e) => {
        console.log(JSON.stringify(e.currentTarget.dataset.position), "Row");

        let tempArr = this.state.data

        let tempValue = tempArr[parseInt(e.currentTarget.dataset.position)];
        tempArr[parseInt(e.currentTarget.dataset.position)] = tempArr[this.state.overDragPosiRow];
        tempArr[this.state.overDragPosiRow] = tempValue;
        this.setState({ data: tempArr })


    };
    render() {
        const contentColumnsInput = (id) => (
            <Menu style={{ cursor: "pointer", marginLeft: "50%", width: "100%" }}>
                <Menu.ItemGroup title="Header Name">
                    <Menu.Item>
                        <input
                            onClick={e => e.preventDefault()}
                            required
                            name="password"
                            value={this.state.inputValue}
                            onChange={(e) => {
                                this.setState({ inputValue: e.target.value })
                            }}

                            type="text" className="form-control" id="pwd" placeholder="Edit Name" />
                    </Menu.Item>
                    <Menu.Item><button className="btn btn-primary btn-block mb-5" onClick={() => {
                        let temp = this.state.table_heading;
                        temp[id].name = this.state.inputValue;
                        this.setState({ table_heading: temp })
                        this.setState({ editVisibilty: false })
                    }}>Edit</button>
                        <button style={{ marginLeft: "10%" }} className="btn btn-primary btn-block ml-5 mb-5" onClick={() => {
                            this.setState({ editVisibilty: false })
                        }}>Cancel</button>
                    </Menu.Item>

                </Menu.ItemGroup>
            </Menu>
        );
        const contentColumnsInputAdd = (
            <Menu style={{ cursor: "pointer", marginLeft: "50%", width: "100%" }}>
                <Menu.ItemGroup title="Header Name">
                    <Menu.Item>
                        <input
                            onClick={e => e.preventDefault()}
                            required
                            name="password"
                            value={this.state.inputValue}
                            onChange={(e) => {
                                this.setState({ inputValue: e.target.value })
                            }}

                            type="text" className="form-control" id="pwd" placeholder="Add Name" />
                    </Menu.Item>
                    <Menu.Item><button className="btn btn-primary btn-block mb-5" onClick={() => {
                        let temp = this.state.table_heading;
                        let tempdata = this.state.data;
                        let temp2 = this.state.show_columns;
                        let temp4 = this.state.parenstSelct;
                        let dataChildren = this.state.dataChildren
                        for (let index = 0; index < this.state.data.length; index++) {
                            tempdata[index] = { ...tempdata[index], [this.state.inputValue]: "New" }

                        }
                        for (let index = 0; index < this.state.dataChildren.length; index++) {
                            for (let a = 0; a < dataChildren[index].children.length; a++) {
                                dataChildren[index].children[a] = { ...dataChildren[index].children[a], [this.state.inputValue]: "New" }
                            }


                        }

                        temp.push({ id: temp.length + 1, name: this.state.inputValue, key: this.state.inputValue.toLowerCase() })
                        temp2.push(true);
                        this.setState({ table_heading: temp, show_columns: temp2, addVisibilty: false, inputValue: "", data: tempdata, tempdata: tempdata, dataChildren })
                    }}>Add</button>

                        <button style={{ marginLeft: "10%" }} className="btn btn-primary btn-block ml-5 mb-5" onClick={() => {
                            this.setState({ addVisibilty: false })
                        }}>Cancel</button>
                    </Menu.Item>


                </Menu.ItemGroup>
            </Menu>
        );
        const contentColumnsChose = (
            <Menu style={{ cursor: "pointer", marginLeft: "50%", width: "100%" }}>
                <Menu.ItemGroup title="Header Name">
                    <Menu.Item>
                        {this.state.table_heading.map((t, i) => (
                            <>
                                <input type="checkbox" name={i} onChange={(e) => {
                                    console.log(e.target.checked);
                                    let temp = this.state.show_columns
                                    temp[parseInt(e.target.name)] = e.target.checked ? true : false
                                    this.setState({ show_columns: temp })
                                }} checked={this.state.show_columns[i]} />
                                <label htmlFor={t.name} style={{ marginLeft: "5%" }}>{t.name}</label>
                                <br />
                            </>
                        ))}
                    </Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        );
        const content = (id) => (
            <Menu style={style}>
                <Menu.ItemGroup title="Columns">
                    <Dropdown overlay={contentColumnsInput(id)} trigger={['hover']} visible={this.state.editVisibilty}>
                        <Menu.Item onMouseEnter={() => this.setState({ editVisibilty: true })}>EditCol</Menu.Item>
                    </Dropdown>

                    <Dropdown overlay={contentColumnsInputAdd} trigger={['hover']} visible={this.state.addVisibilty}>
                        <Menu.Item onMouseEnter={() => this.setState({ addVisibilty: true })}>NewCol</Menu.Item>
                    </Dropdown>

                    <Popconfirm
                        title="such delete cannot be undone"
                        onConfirm={() => this.deleteColumns(id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Menu.Item>DelCol</Menu.Item>
                    </Popconfirm>


                    <Dropdown overlay={contentColumnsChose} trigger={['hover']}>
                        <Menu.Item>ChooseCol</Menu.Item>
                    </Dropdown>

                    <Menu.Item>FreezeCol</Menu.Item>
                    <Menu.Item>FilterCol</Menu.Item>
                    <Menu.Item>MultiSort</Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        );
        return (
            <div className="row" style={{ width: "100%", height: "100%" }}>
                <div className="col-12">
                    <div class="view">
                        <div class="wrapper">
                            <table className="table fixed_headers" style={{ width: "100%", maxHeight: "100%", overflow: "scroll" }} id="defaultTable"
                            >
                                <thead className="thead" style={{ color: "#4e73df", backgroundColor: "#efefef" }}>
                                    <tr>
                                        <th></th>
                                        {this.state.table_heading.map((key, i) => (
                                            <>
                                                {this.state.show_columns[i] ?
                                                    <th>
                                                        <input
                                                            onClick={e => e.preventDefault()}
                                                            name={key}
                                                            value={this.state[key.key]}
                                                            onChange={(e) => {

                                                                this.setState({ [key.key]: e.target.value })
                                                                let arr = []
                                                                this.state.data.map(i => {
                                                                    if (i[key.key].toLowerCase().includes(e.target.value.toLowerCase())) {
                                                                        arr.push(i);
                                                                    }
                                                                })

                                                                this.setState({ data: arr })
                                                                if (e.target.value == "") {
                                                                    this.setState({ data: this.state.tempdata })
                                                                }
                                                            }}

                                                            type="text" className="form-control" id={key.key} placeholder={`Search by ${key.key}`} />
                                                    </th>
                                                    : null}

                                            </>
                                        ))}

                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div class="view">
                        <div class="wrapper">
                            <table className="table fixed_headers" style={{ width: "100%", maxHeight: "100%", overflow: "scroll" }} id="defaultTable"
                            >
                                <thead className="thead" style={{ color: "#4e73df", backgroundColor: "#efefef" }}>
                                    <tr>
                                        <th>
                                            <input type="checkbox" onChange={(e) => { this.allselect(e.target.checked) }} id="vehicle3" name="vehicle3" value="Boat" />
                                        </th>
                                        {this.state.table_heading.map((th, i) => (
                                            <>
                                                {this.state.show_columns[i] ?
                                                    <Dropdown overlay={content(i)} trigger={['contextMenu']}>

                                                        <th
                                                            className={`${i == 0 ? "sticky-col first-col" : ""} p-2`}
                                                            style={{ cursor: "pointer" }}
                                                            key={"grid-header-" + th.id}
                                                            id={"colId" + th.id}
                                                            data-position={i}
                                                            draggable
                                                            onDragStart={(e) => this.newOnDragStart(e, th.id)}
                                                            onDragEnd={(e) => this.newOnDragEnd(e)}
                                                            onDragOver={(e) => this.newOnDragOver(e)}
                                                            scope="col">{th.name}
                                                            <span style={{ marginLeft: "10px" }}>
                                                                <i className="fad fa-chevron-square-up" name={Object.keys(this.state.data[0])[i]} style={{ position: "absolute" }} onClick={() => this.sortByColumns(th.key, "asc")}></i>
                                                                <i className="fad fa-chevron-square-down" name={Object.keys(this.state.data[0])[i]} style={{ position: "absolute", marginTop: "10px" }} onClick={() => this.sortByColumns(th.key, "dec")}></i>
                                                            </span>
                                                        </th>
                                                    </Dropdown>
                                                    : null}


                                            </>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((d, i) => (
                                        <>
                                            <tr onClick={() => { this.onRowShowHide(i) }}
                                                style={{ cursor: "pointer" }}
                                                key={"grid-header-" + d.id}
                                                id={"colId" + d.id}
                                                data-position={i}
                                                draggable
                                                onDragStart={(e) => this.newOnDragStartRow(e, d.id)}
                                                onDragEnd={(e) => this.newOnDragEndRow(e)}
                                                onDragOver={(e) => this.newOnDragOverRow(e)}
                                            >
                                                <td>
                                                    <input type="checkbox" id={d.id} name={d.id} checked={this.state.parenstSelct[d.id]} onChange={() => this.parentSelect(d.id)} />
                                                </td>
                                                {this.state.table_heading.map(tc => (
                                                    <>
                                                        {Object.entries(d).map(([key, value], ii) =>
                                                            <>
                                                                {this.state.show_columns[ii] ?
                                                                    <>
                                                                        {tc.key == key ?
                                                                            <td
                                                                            >{value}</td>
                                                                            : null}

                                                                    </>
                                                                    : null
                                                                }
                                                            </>
                                                        )}
                                                    </>
                                                ))}

                                            </tr>
                                            {this.state.childrenShowHide[i] ?
                                                <>
                                                    {this.state.dataChildren.map((dd, ii) => (
                                                        <>
                                                            {dd.parent_id == d.id ?
                                                                <>
                                                                    {dd.children.map(data => (


                                                                        <tr>
                                                                            <td>
                                                                                <input type="checkbox" id={dd.parent_id} name={dd.parent_id} checked={this.state.parenstSelct[dd.parent_id]} onChange={() => this.parentSelect(dd.parent_id)} />
                                                                            </td>
                                                                            {this.state.table_heading.map(tcc => (
                                                                                <>
                                                                                    {Object.entries(data).map(([key1, value1], iii) =>
                                                                                        <>
                                                                                            {this.state.show_columns[iii] ?
                                                                                                <>
                                                                                                    {tcc.key == key1 ?
                                                                                                        <td>{value1}</td>
                                                                                                        : null}

                                                                                                </>
                                                                                                : null
                                                                                            }
                                                                                        </>
                                                                                    )}
                                                                                </>
                                                                            ))}
                                                                        </tr>

                                                                    ))}
                                                                </>
                                                                : null}

                                                        </>

                                                    ))}
                                                </>
                                                : null}

                                        </>

                                    ))}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}





export default Login
