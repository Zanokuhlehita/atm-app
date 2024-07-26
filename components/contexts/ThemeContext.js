import React, { createContext, Component } from 'react'
import { View, Text } from 'react-native'

const ThemeContext = createContext();

class ThemeProvider extends Component {
    state = {
        name: 'tacos',
        calories: '50'
    }

    setName = (name) => {
        this.setState({ name });
    }
    setCalories = (calories) => {
        this.setState({ calories });
    }
    render() {
        return (
            <ThemeContext.Provider
                value={{
                    name: this.state.name,
                    calories: this.state.calories,
                    setName: this.setName,
                    setCalories: this.setCalories
                }}
            >
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

export { ThemeProvider, ThemeContext };