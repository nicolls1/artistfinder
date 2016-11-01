import React from 'react'

require("../css/typeahead.css")

export class TypeaheadDataProvider {
    getData(text, cb) {
        throw 'Not Implemented: TypeaheadDataProvider.getData is required';
    }
}

export class TypeaheadRow extends React.Component {
    constructor(props) {
        super(props);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    onMouseEnter() {
        this.props.onMouseEnter(this.props.index);
    }
    onMouseLeave() {
        this.props.onMouseLeave(this.props.index);
    }
    onClick() {
        this.props.onClick(this.props.index);
    }
    render() {
        var className = 'typeahead-row';
        if (this.props.active == true) {
            className += ' active';
        }

        return (
            <div className={className}
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}
                 onClick={this.onClick}>
                {this.props.children}
            </div>
        )
    }
}

class TypeaheadInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            typeaheadData: [],
            activeRow: -1,
        }
        this.onTextChange = this.onTextChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onMouseEnterRow = this.onMouseEnterRow.bind(this);
        this.onMouseLeaveRow = this.onMouseLeaveRow.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onClickRow = this.onClickRow.bind(this);
    }
    componentWillMount() {
        document.addEventListener('click', this.handleClick.bind(this), 
                false);
    }
    componentWillUnmout() {
        document.removeEventListener('click', this.handleClick, false);
    }
    handleClick(event) {
        if (this.refs.typeaheadContainer && 
            !this.refs.typeaheadContainer.contains(event.target)) {
            this.setState({typeaheadData: [], activeRow: -1});
        }
    }
    onTextChange(event) {
        this.setState({value: event.target.value});

        if (event.target.value == '') {
            this.setState({typeaheadData: []});
            return;
        }

        this.props.typeaheadDataProvider.getData(event.target.value, 
                this.onTypeaheadData.bind(this));
    }
    onTypeaheadData(data) {
        this.setState({typeaheadData: data, activeRow: -1});
    }
    onSubmit(event) {
        event.preventDefault();
        if (this.props.onSubmit) {
            if (this.state.activeRow >= 0) {
                this.props.onSubmit(this.state.typeaheadData
                                    [this.state.activeRow]
                                    [this.props.resultKey]);
            } else {
                this.props.onSubmit(this.state.value);
            }
        }
        this.setState({value: '', typeaheadData: [], activeRow: -1});
        return false;
    }
    onMouseEnterRow(index) {
        this.setState({activeRow: index});
    }
    onMouseLeaveRow(index) {
        this.setState({activeRow: null});
    }
    onClickRow(index) {
        this.props.onSubmit(this.state.typeaheadData[index]
                [this.props.resultKey]);
        this.setState({value: '', typeaheadData: [], activeRow: -1});
    }
    onKeyDown(event) {
        if (this.state.typeaheadData.length <= 0) {
            return false;
        }

        if (event.key == 'ArrowUp') {
            event.preventDefault();
            this.setState({
                activeRow:(this.state.activeRow+
                           this.state.typeaheadData.length-1)%
                           this.state.typeaheadData.length
            });
        } else if (event.key == 'ArrowDown') {
            event.preventDefault();
            this.setState({
                activeRow:(this.state.activeRow+1)%
                           this.state.typeaheadData.length
            });
        }
        return false;
    }
    render() {
        var maybeTypeaheadRows = null;
        if (this.state.typeaheadData.length != 0 ) {
            var typeaheadRows = this.state.typeaheadData.map((row, i) => {
                return (
                    <TypeaheadRow key={row['id']}
                                  index={i}
                                  onMouseEnter={this.onMouseEnterRow}
                                  onMouseLeave={this.onMouseLeaveRow}
                                  onClick={this.onClickRow}
                                  active={this.state.activeRow==i}>
                        {React.createElement(
                            this.props.typeaheadRow,
                            row
                        )}
                    </TypeaheadRow>
                );
            });
            maybeTypeaheadRows = (
                <div ref='typeaheadContainer'
                     className='typeahead-input-row-container'>
                    {typeaheadRows}
                </div>
            );
        }

        var className = "typeahead-input ";
        if (this.props.className) {
            className += this.props.className;
        }

        return (
            <div className={className}>
                <form onSubmit={this.onSubmit}>
                    <input type='text' 
                           value={this.state.value}
                           onChange={this.onTextChange}
                           onKeyDown={this.onKeyDown} />
                </form>
                {maybeTypeaheadRows}
            </div>
        );
    }
}

TypeaheadInput.propTypes = {
    className: React.PropTypes.string,
    typeaheadDataProvider: React.PropTypes.instanceOf(TypeaheadDataProvider),
    typeaheadRow: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    resultKey: React.PropTypes.string,
}

export default TypeaheadInput;
