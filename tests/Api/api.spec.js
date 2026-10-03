import 'dotenv/config'
import * as allure from 'allure-js-commons'
import {test, expect} from '@playwright/test'

const baseApiUrl = "https://reqres.in/api/collections";
const projectId = "53045"
const headers = {
    'x-api-key': process.env.REQRES_API_KEY
}
const headersAdmin ={
    'x-api-key': process.env.REQRES_API_KEY_ADMIN
}

test('Checking if endpoints are up',{tag : ['@api', '@lifeCheckApi']}, async ({request}) => {
    
    console.log(process.env.REQRES_API_KEY ? 'API key loaded' : 'API key missing');
    expect((await request.get(baseApiUrl+'/products/records?project_id='+projectId,{ headers })).status()).toBe(200);
    expect((await request.get(baseApiUrl+'?project_id'+projectId,{ headers })).status()).toBe(200);

});

test('header check. No header = no access',{tag : ['@api','@securityCheckApi']}, async ({request}) => {
    expect((await request.get(baseApiUrl+'/products/records?project_id='+projectId)).status()).toBe(401);
    expect((await request.get(baseApiUrl+'?project_id'+projectId,)).status()).toBe(401);
});

test('create a new record, then fetch it. Delete afterwards',{tag:['@api', '@createRecord', '@deleteRecord']}, async ({request}) => {
    //create new record
   const response = await request.post(
        baseApiUrl+'/products/records?project_id='+projectId,
        {
            headers: headersAdmin,
            data:{
                    data:{
                        "name": "Wireless Buttphones",
                        "price": 59.99,
                        "category": "Electronics",
                        "in_stock": true
                    }
            }
        }
    );
    expect(response.status()).toBe(201);
    //check new record exists
    const body = await response.json();
    const itemId = body.data.id;
    console.log(baseApiUrl+'/products/records/'+itemId+'?project_id='+projectId)
    expect((await request.get(baseApiUrl+'/products/records/'+itemId+'?project_id='+projectId, {headers})).status()).toBe(200);

    //delete the record afterwards
   const deleteResponse =  await request.delete(baseApiUrl+'/products/records/'+itemId+'?project_id='+projectId, {headers: headersAdmin});
    expect(deleteResponse.status()).toBe(204);
    expect((await request.get(baseApiUrl+'/products/records/'+itemId+'?project_id='+projectId, {headers})).status()).toBe(404);


})