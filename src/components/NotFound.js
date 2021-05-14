import React from 'react'
import { Container, Segment } from 'semantic-ui-react'

function NotFound() {
    return (
        <Container>
            <Segment inverted color='red'>
                404 - Not Found
            </Segment>
        </Container>
    )
}

export default NotFound
