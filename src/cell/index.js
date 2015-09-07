/**
 * Created by xy on 15/4/13.
 */
import React from 'react';
import CheckBox from './CheckBox';
import TextField from './TextField';

class Cell extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            'mode':'view',
            'fold':1   // 1- fold  0-unfold
        };
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    componentWillUnmount () {
       
    }

    prepareStyle() {

    }
    handleClick(e) {
        this.setState({
            mode:"edit"
        })
    }

    getSelectionRows() {
        var _props= this.props;
        return _props.data.filter(function(item) {
            return item.jsxchecked
        });
    }
    handleCheckChange(e) {
        var _props= this.props,v=_props.rowData;
        v.jsxchecked=e.target.checked;
        this.setState({});
        if( _props.rowSelection) {
            _props.rowSelection.onSelect.apply(null,[v.jsxchecked,v,this.getSelectionRows()])
        }
    }
    handleTxtChange(e){
        var _props= this.props;
        _props.rowData[_props.column.dataKey]=e.target.value;
    }
    onblur(e) {
       var _props= this.props,record=_props.rowData,value=record[_props.column.dataKey]
       
        var isValid=_props.onModifyRow.apply(null,[value,_props.column.dataKey,record]);
        if(isValid) {
            this.setState({
                mode:"view"
            });
        }else {
           e.target.focus?e.target.focus():"";
        }
    }

    showSubComp() {
        this.props.showSubCompCallback.call(this.props.ctx);
    }

    renderChildIcon() {
        if(this.props.cellIndex==0 && this.props.hasSubComp) {
            if(this.props.st_showSubComp) {
                return (<span className="kuma-grid-tree-icon" onClick={this.showSubComp.bind(this)}><i className="kuma-icon kuma-icon-tree-open"></i></span>);
            }else {
                return (<span className="kuma-grid-tree-icon" onClick={this.showSubComp.bind(this)}><i className="kuma-icon kuma-icon-tree-close"></i></span>);
            }
        }
    }
    render() {
        
        let props= this.props,_column=props.column, _width=_column.width, _style={
            width: _width?_width:100,
            textAlign:props.align?props.align:"center"
        },_v=props.rowData,renderProps;

        if(_column.type=='checkbox') {
            let checked;
            if(_v.jsxchecked){
                checked='checked'
            }else {
                checked="";
            }
            _v=<CheckBox align={props.align} jsxchecked={checked} ref="checkbox" onchange={this.handleCheckChange.bind(this)}/>

        }else if(_column.type=='text' && this.state.mode=='edit') {
            renderProps={
                value: _v[_column.dataKey],
                onchange:this.handleTxtChange.bind(this),
                onblur:this.onblur.bind(this)
            }
            _v=<TextField {...renderProps}/>
        }
        else {
            _v=<span>{props.rowData[_column.dataKey]}</span>;
        }
        return (<div className={props.jsxprefixCls} style={_style} onClick={this.handleClick.bind(this)}>
            {this.renderChildIcon()}
            {_v}
        </div>);   
    }
};

Cell.propTypes= {
};

Cell.defaultProps = {
    jsxprefixCls: "kuma-grid-cell"
};

export default Cell;