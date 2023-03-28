<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    //
    public function index()
    {
        $users = User::all();
        return view('users.index', compact('users'));
    }

    public function create()
    {
        return view('users.create');
    }

    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users,email',
            'employee_id' => 'required|regex:/^[A-Z]{2}-\d{4}$/|unique:users',
        ]);

        // Create the user
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->employee_id = $request->employee_id;
        $user->save();

        // Redirect to the index page with success message
        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        return view('users.edit', compact('user'));
    }

    public function update(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'employee_id' => 'required|regex:/^[A-Z]{2}-\d{4}$/|unique:users,employee_id,' . $id,
        ]);

        // Update the user
        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->employee_id = $request->employee_id;
        $user->save();

        // Redirect to the index page with success message
        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy($id)
    {
        // Delete the user
        $user = User::findOrFail($id);
        $user->delete();

        // Redirect to the index page with success message
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
