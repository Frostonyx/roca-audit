export async function GET(request: Request) {

    
      
      const {searchParams} = new URL(request.url)
      const name = searchParams.get("name")
      const number = searchParams.get("number")
      const request_1 = await fetch(`https://api.scryfall.com/cards/named?exact=${name}&collector_number=${number}`)
      
      
      const jsonDataSet = await request_1.json();

      const set: string = jsonDataSet.set;
      const request_2 = await fetch(`https://api.scryfall.com/cards/${set}/${number}`);
      const jsonDataImage = await request_2.json();
      const cardImage: string = jsonDataImage.image_uris.normal
    
    
   
    return Response.json({ cardImage })
  }