import React from 'react'

import './items.css'

import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'

import Select from 'react-select'
import { changeValue } from '../../redux/actions'

export class Item extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeValue = this.onChangeValue.bind(this)
    }

    onChangeValue(data){
        const { thingId } = this.props
        this.setState({value: data.value})
        changeValue({thingId, ...data})
    }

    render() {
        const { item, thingId } = this.props

        const state = item.state
        
        let item_cmp
        switch ( item.type ) {
            case 'SWITCH':
                item_cmp = <Switch item={item} onChangeValue={ this.onChangeValue } />
                break
            case 'TEXT':
                item_cmp = <Text item={item} onChangeValue={ this.onChangeValue } />
                break
            case 'INTEGER':
                item_cmp = <Integer item={item} onChangeValue={(data) => {this.props.onChangeValue({thingId, ...data})} } />
                break
            case 'FLOAT':
                item_cmp = <Float item={item} onChangeValue={(data) => {this.props.onChangeValue({thingId, ...data})} } />
                break
            case 'ENUM':
                item_cmp = <Enum item={item} onChangeValue={(data) => {this.props.onChangeValue({thingId, ...data})} } />
                break
            default:
                item_cmp = <UncaughtItem item={item} />
                break
        }

        return (
            <div className={"item " + ((item['read-only'] || state !== "ENABLED") ? 'disabled' : '') }>
                { item_cmp }
            </div>
        )

    }
}

export class Switch extends React.Component {
    render() {
        const { item } = this.props
        // const isChecked = this.props.value
        const isChecked = item.value === 'on'
        return (
            <div className="switch-item">
                <label className="title">{ item.name }</label>
                <label className="switch">
                    {(item['read-only'] || item.state !== "ENABLED") 
                        ?
                        <input type="checkbox" name={item.id} id={item.id} checked={isChecked} disabled />
                        :
                        <input type="checkbox" name={item.id} id={item.id} checked={isChecked} onChange={(event) => {this.props.onChangeValue({itemId: item.id, value: (event.target.checked) ? 'on' : 'off' })}} />
                    }
                    <span className="slider round"></span>
                </label>
            </div>
        )
    }
}

export class Text extends React.Component {
    render() {
        const { item } = this.props
        return (
            <div className="text-item">
                <label className="title">{ item.name }</label>
                {(item['read-only'] || item.state !== "ENABLED") 
                    ?
                    <input type="text" name={item.id} id={item.id} value={item.value} readOnly />
                    :
                    <input type="text" name={item.id} id={item.id} value={item.value} onChange={(event) => {this.props.onChangeValue({itemId: item.id, value: event.target.value})}}/>
                }
            </div>
        )
    }
}

export class Integer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: parseInt(this.props.item.value)
        }
    }
    render() {
        const { item } = this.props

        const min = (item.constraints.min) ? parseInt(item.constraints.min) : 0
        const max = (item.constraints.max) ? parseInt(item.constraints.max) : 100
        const step = (item.constraints.step) ? parseInt(item.constraints.step) : 1

        return (
            <div className="integer-item">
                <label className="title">{ item.name }</label>
                {(item['read-only'] || item.state !== "ENABLED") 
                    ?
                    <InputRange
                        maxValue={ max }
                        minValue={ min }
                        disabled={ true }
                        value={ this.state.value }
                        onChange={ () => {} }
                        />
                    :
                    <InputRange
                        maxValue={ max }
                        minValue={ min }
                        step={ step }
                        value={ this.state.value }
                        onChange={ value => this.setState({ value }) }
                        onChangeComplete={value => { this.props.onChangeValue({itemId: item.id, value: value}) }} />
                }
            </div>
        )
    }
    componentDidUpdate(prevProps, prevState){
        const { item } = this.props
        const value = parseInt(item.value)
        if(parseInt(prevProps.item.value) !== value){
            this.setState({ value })
        }
    }
}

export class Float extends React.Component {
    constructor(props) {
        super(props)
        const {item} = this.props
        this.state = {
            value: parseFloat(item.value)
        }
    }
    render() {
        const { item } = this.props

        const min = (item.constraints.min) ? parseFloat(item.constraints.min) : 0
        const max = (item.constraints.max) ? parseFloat(item.constraints.max) : 100
        const precision = (item.constraints.precision) ? parseInt(item.constraints.precision) : 1
        const step = (item.constraints.step) ? parseFloat(item.constraints.step) : Math.pow(10, -precision)

        return (
            <div className="float-item">
                <label className="title">{ item.name }</label>
                {(item['read-only'] || item.state !== "ENABLED") 
                    ?
                    <InputRange
                        maxValue={ max }
                        minValue={ min }
                        disabled={ true }
                        value={ this.state.value }
                        onChange={ () => {} }
                        />
                    :
                    <InputRange
                        maxValue={ max }
                        minValue={ min }
                        step={ step }
                        value={ parseFloat(this.state.value) }
                        onChange={ value => this.setState({ value: value.toFixed(precision) }) }
                        onChangeComplete={ value => { this.props.onChangeValue({itemId: item.id, value: parseFloat(value).toFixed(precision)}) } } />
                }
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState){

        const { item } = this.props
        const value = parseFloat(item.value)
        if(parseFloat(prevProps.item.value) !== value){
            this.setState({ value })
        }
    }
}

export class Enum extends React.Component {
    render() {
        const { item } = this.props

        const values = (item.constraints.values) ? item.constraints.values : []
        const options = values.map((value, i)=>{
            return {
                value: "option"+i,
                label: value
            }
        })

        let element = null
        if(item['read-only'] || item.state !== "ENABLED"){
            element = 
                // <select name={ item.id } id={ item.id } disabled value={ item.value } onChange={(event)=>{this.props.onChangeValue({itemId: item.id, value: event.target.value})}}>
                //     {
                //         values.map((value, i)=>
                //             <option key={i} value={ value }>{ value }</option>
                //         )
                //     }
                // </select>
                <Select
                    value={ item.value }
                    isDisabled={true}
                    options={ options }
                />
        }else {
            element =
                <Select
                    value={ item.value }
                    onChange={ (value)=>{this.props.onChangeValue({itemId: item.id, value: value})} }
                    options={ options }
                />
        }
        

        return (
            <div className="enum-item">
                <label className="title">{ item.name }</label>
                { element }
            </div>
        )
    }
}

export class UncaughtItem extends React.Component {
    render() {
        const {item} = this.props
        return (
            <div className="">
                <label>UncaughtItem</label>
                <label>{item.name}</label>
                <b>{item.value}</b>
            </div>
        )
    }
}

