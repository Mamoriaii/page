import React from 'react'
import { Button } from 'antd'
import { Form, FormItem, InternalFieldList as FieldList, FormButtonGroup, Submit } from '@formily/antd'
import { Input, Radio, Select } from '@formily/antd-components'
import 'antd/dist/antd.css'
import { Row, Col } from 'antd'
const _ = require('lodash');
interface Props {
}

let _types = '/,P,SEG';
let _speaker = '安黒六藤浦柘湊群/';
let _poss = 'N,V,A,S,/';
let bl = [{ label: 'true', value: true }, { label: 'false', value: false }, { label: 'null', value: '/' }]
const FormSeg: React.FC<Props> = () => {
    return <>
        <Form
            onSubmit={console.log}
        >

            <FormItem label="speaker" name="speaker" component={Radio.Group} dataSource={_speaker.split('')} initialValue={'/'} />
            <FormItem label="_input" name="_input" component={Input} placeholder="input show" />
            <FormItem label="grammar" name="grammar" component={Input} placeholder="grammar show" />
            <Row>
                <Col span={12}> <FormItem label="type" name="type" component={Radio.Group} dataSource={_types.split(',')} initialValue={'/'} /></Col>
                <Col span={12}> <FormItem label="pos" name="pos" component={Radio.Group} dataSource={_poss.split(',')} initialValue={'S'} /></Col>
            </Row>
            <Row>
                <Col span={12}> <FormItem label="isOs" name="isOs" component={Radio.Group} dataSource={bl} initialValue={'/'} /></Col>
                <Col span={12}> <FormItem label="isBg" name="isBg" component={Radio.Group} dataSource={bl} initialValue={'/'} /></Col>
            </Row>

            <div style={{ border: '1px solid black', borderRadius: 4, padding: 5 }}>
                <FieldList
                    name="children"
                    initialValue={[]}
                >
                    {({ state, mutators }) => {
                        const onAdd = () => mutators.push()
                        return (
                            <div>
                                {state.value.map((item: any, index: number) => {
                                    const onInsertAfter = (index: number) => mutators.insert(index + 1, {})
                                    const onRemove = (index: number) => mutators.remove(index)
                                    const onMoveUp = (index: number) => mutators.moveUp(index)
                                    const onMoveDown = (index: number) => mutators.moveDown(index)
                                    return (
                                        <React.Fragment key={index}>
                                            {!!index && <hr />}
                                            <Row >
                                                <Col span={18}>
                                                    <FormItem label="_input" name={`children.${index}._input`} component={Input} placeholder="input show" />
                                                    <FormItem label="grammar" name={`children.${index}.grammar`} component={Input} placeholder="grammar show" />
                                                    <Row>
                                                        <Col span={12}> <FormItem label="type" name={`children.${index}.type`} component={Radio.Group} dataSource={_types.split(',')} initialValue={'/'} /></Col>
                                                        <Col span={12}> <FormItem label="pos" name={`children.${index}.pos`} component={Radio.Group} dataSource={_poss.split(',')} initialValue={'S'} /></Col>
                                                    </Row>
                                                </Col>
                                                <Col span={5} offset={1}>
                                                    <Button onClick={onInsertAfter.bind(null, index)} shape="circle">+</Button>
                                                    <Button onClick={onRemove.bind(null, index)} shape="circle">-</Button>
                                                    <Button onClick={onMoveUp.bind(null, index)} shape="circle">↑</Button>
                                                    <Button onClick={onMoveDown.bind(null, index)} shape="circle">↓</Button>
                                                </Col>
                                            </Row>
                                        </React.Fragment>
                                    )
                                })}
                                <Button onClick={onAdd}>add</Button>
                            </div>
                        )
                    }}
                </FieldList>

            </div>
            <FormButtonGroup offset={7}>
                <Submit>提交</Submit>
            </FormButtonGroup>
        </Form>
    </>;
}
export default FormSeg;

