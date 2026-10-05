export class ReqresClient {
    constructor(request, headers) {
        this.request = request;
        this.headers = headers;
        this.baseApiUrl = 'https://reqres.in/api/collections';
        this.projectId='53045';

    }

async createRecord(record) {
       const response = await this.request.post(
        this.baseApiUrl+'/products/records?project_id='+this.projectId,
        {
            headers: this.headers,
            data:{
                    data:{
                        record
                    }
            }
        }
    );

    return response;

}

async getRecord(recordId) {
   return await this.request.get
   (this.baseApiUrl+'/products/records/'+recordId+'?project_id='+this.projectId, {headers:this.headers}

   );
}

async deleteRecord(recordId) {
    return await this.request.delete(
        this.baseApiUrl+'/products/records/'+recordId, {headers:this.headers}
    );
}

updateHeaders(headers) {
    this.headers=headers;
}

returnHeaders() {
    return {headers: this.headers}
}
}
