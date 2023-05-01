export interface IAsset {
    id: number;
    num_sales: 0;
    image_url: string;
    image_preview_url: string;
    image_thumbnail_url: string;
    name: string;
    description: string;
    external_link: string;
    asset_contract: IAssetContract;
    permalink: string;
    owner: IOwner;
    token_id: string;
}

interface IAssetContract {
    address: string;
    asset_contract_type: string;
    created_date: string;
    schema_name: string;
}

interface IOwner {
    profile_img_url: string;
    address: string;
    user: {
        username: string;
    };
}

interface Icreator {}

export interface INFTResponse {
    next: string | null;
    previous: string | null;
    assets: IAsset[];
}
