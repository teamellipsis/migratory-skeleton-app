import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Todo extends React.Component {
    render() {
        const { onClick, completed, text } = this.props;
        return (
            <ListItem>
                <Card>
                    <CardActionArea onClick={onClick}>
                        <CardContent>
                            <Typography
                                style={{
                                    textDecoration: completed ? 'line-through' : 'none'
                                }}>
                                {text}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </ListItem>
        );
    }
}

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default Todo;
