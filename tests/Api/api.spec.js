import 'dotenv/config'
import * as allure from 'allure-js-commons'
import {test, expect} from '@playwright/test'
import { ReqresClient } from './clients/regresClient';

    const headersAdmin ={
        'x-api-key': process.env.REQRES_API_KEY_ADMIN
    }
    const headersRegular = {
        'x-api-key': process.env.REQRES_API_KEY
    }


test('Checking if endpoints are up',{tag : ['@api', '@lifeCheckApi']}, async ({request}) => {
    //TODO: Refactor this to use API Client
    console.log(process.env.REQRES_API_KEY ? 'API key loaded' : 'API key missing');
    expect((await request.get(baseApiUrl+'/products/records?project_id='+projectId,{ headers })).status()).toBe(200);
    expect((await request.get(baseApiUrl+'?project_id'+projectId,{ headers })).status()).toBe(200);

});

test('header check. No header = no access',{tag : ['@api','@securityCheckApi']}, async ({request}) => {
     //TODO: Refactor this to use API Client
    expect((await request.get(baseApiUrl+'/products/records?project_id='+projectId)).status()).toBe(401);
    expect((await request.get(baseApiUrl+'?project_id'+projectId,)).status()).toBe(401);
});

test('create a new record, then fetch it. Delete afterwards',{tag:['@api', '@createRecord', '@deleteRecord']}, async ({request}) => {

    const api = new ReqresClient(request,headersAdmin);
    //create new record
    const response = await api.createRecord({
        name:'Grumble cakes',
        price: 50.00,
        category: 'Sugar',
        in_stock:true
    })

    expect(response.status()).toBe(201);
    //check new record exists
    
    const body = await response.json();
    const itemId = body.data.id;

    //Switch out headers and check if new item is actually there
    api.updateHeaders(headersRegular);
    expect((await api.getRecord(itemId)).status()).toBe(200);

    //delete the record afterwards with admin headers, then switch to regular headers and check if record is gone
    api.updateHeaders(headersAdmin);
   const deleteResponse =  await api.deleteRecord(itemId);
    expect(deleteResponse.status()).toBe(204);
    api.updateHeaders(headersRegular);
    expect((await api.getRecord(itemId)).status()).toBe(404);
})