<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

use function PHPUnit\Framework\fileExists;

class ProductController extends Controller
{
    public function get_all_products()
    {
        $products = Product::all();

        return response()->json([
            'products' => $products
        ],200);
    }

    public function add_product(Request $request)
    {

        $product = new Product();

        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'description' => ['required'],
            'photo' => ['nullable'],
            'type' => ['required'],
            'quantity' => ['required', 'numeric'],
            'price' => ['required', 'integer'],
        ]);

        $errors = '!!';

        if ($validator->fails()) {
            return response()->json(compact('errors'), 500);
        }

        $product->name = $request->name;
        $product->description = $request->description;
        if ($request->photo) {
            $strpos = strpos($request->photo, ';');
            $sub = substr($request->photo, 0, $strpos);
            $ex = explode('/', $sub)[1];
            $name = time() . "." . $ex;
            $img = Image::make($request->photo)->resize(117, 100);
            $upload_path = public_path() . "/upload/";
            if (!file_exists($upload_path)) {
                mkdir($upload_path, 666, true);
            }

            $img->save($upload_path . $name);
            $product->photo = $name;
        } else {
            $product->photo = 'image.png';
        }
        $product->photo = $name;
        $product->type = $request->type;
        $product->quantity = $request->quantity;
        $product->price = $request->price;
        $product->save();
    }
    public function get_edit_product($id)
    {
        $product = Product::find($id);

        return response()->json([
            'product' => $product
        ],200);
    }
    public function update_product(Request $request, $id)
    {
        $product = Product::find($id);
        
        $product->name = $request->name;
        $product->description = $request->description;

        if ($product->photo != $request->photo)
        {
            $strpos = strpos($request->photo, ';');
            $sub = substr($request->photo, 0, $strpos);
            $ex = explode('/', $sub)[1];
            $name = time() . "." . $ex;
            $img = Image::make($request->photo)->resize(117, 100);
            $upload_path = public_path() . "/upload/";
            $image = $upload_path. $product->photo;
            $img->save($upload_path.$name);
            if(fileExists($image)){
                @unlink($image);
            }
        }else {
            $name = $product->photo;
        }
        $product->photo = $name;
        $product->type = $request->type;
        $product->quantity = $request->quantity;
        $product->price = $request->price;
        $product->save();
    }
    public function delete_product($id)
    {
        $product = Product::findorFail($id);
        $image_path = public_path() . "/upload/";
        $image = $image_path. $product->photo;
        if(fileExists($image)){
            @unlink($image);
        }
        $product->delete();
    }
}
