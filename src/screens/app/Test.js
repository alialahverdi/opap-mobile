import React from 'react';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
    {
        title: 'First',
        content: 'Lorem ipsum...',
    },
    {
        title: 'Second',
        content: 'Lorem ipsum...',
    },
];

export default class AccordionView extends Component {
    state = {
        activeSections: [],
    };

    _renderSectionTitle = (section) => {
        return (
            <View >
                <Text>{section.content}</Text>
            </View>
        );
    };

    _renderHeader = (section) => {
        return (
            <View>
                <Text >{section.title}</Text>
            </View>
        );
    };

    _renderContent = (section) => {
        return (
            <View>
                <Text>{section.content}</Text>
            </View>
        );
    };

    _updateSections = (activeSections) => {
        this.setState({ activeSections });
    };

    render() {
        return (
            <SafeAreaView>
                <Accordion
                    sections={SECTIONS}
                    activeSections={this.state.activeSections}
                    renderSectionTitle={this._renderSectionTitle}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this._updateSections}
                />
            </SafeAreaView>
        );
    }
}